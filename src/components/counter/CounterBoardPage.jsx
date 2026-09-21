import { useEffect, useRef, useState } from 'react'
import { useOrder } from '../../context/OrderContext'
import { deriveStatus } from '../../context/orderStatus'
import { waLink, orderReadyText } from '../../utils/whatsapp'

const PIN = import.meta.env.VITE_COUNTER_PIN || '2026'
const PIN_KEY = 'hob_counter_unlocked'

function formatClock(ms) {
  if (ms <= 0) return '00:00'
  const total = Math.round(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// Browsers block audio from a freshly-created AudioContext until it's been
// resumed inside a real user gesture (a click/tap). We create ONE shared
// context and unlock it the moment staff submits the PIN — after that,
// reusing this same context lets the chime actually play unattended later.
let sharedAudioCtx = null

function unlockAudio() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!sharedAudioCtx) sharedAudioCtx = new Ctx()
    if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume()
  } catch {
    // Web Audio unavailable — chime just won't play, banner/vibration still work.
  }
}

function playTone(ctx, freq, start, duration, volume) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.05)
}

// A louder, more urgent 3-burst chime (not just one quick two-note blip) so
// it's hard to miss even if the counter is a bit noisy.
function playChime() {
  try {
    if (!sharedAudioCtx) unlockAudio()
    const ctx = sharedAudioCtx
    if (!ctx) return
    if (ctx.state === 'suspended') ctx.resume()

    const burstGap = 0.55
    for (let burst = 0; burst < 3; burst++) {
      const base = ctx.currentTime + burst * burstGap
      playTone(ctx, 880, base, 0.35, 0.5)
      playTone(ctx, 1180, base + 0.16, 0.35, 0.5)
    }
  } catch {
    // Fail silently — the on-screen banner and vibration still alert staff.
  }
}

function vibrate() {
  try {
    navigator.vibrate?.([250, 120, 250, 120, 250])
  } catch {
    // Vibration unsupported (e.g. iOS Safari) — ignore.
  }
}

function useTitleFlash(active, message) {
  useEffect(() => {
    if (!active) return undefined
    const original = document.title
    let showAlert = true
    const id = setInterval(() => {
      document.title = showAlert ? message : original
      showAlert = !showAlert
    }, 1000)
    return () => {
      clearInterval(id)
      document.title = original
    }
  }, [active, message])
}

function useWakeLock(active) {
  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return undefined
    let lock
    let cancelled = false
    navigator.wakeLock
      .request('screen')
      .then((l) => {
        if (cancelled) l.release().catch(() => {})
        else lock = l
      })
      .catch(() => {})
    return () => {
      cancelled = true
      lock?.release().catch(() => {})
    }
  }, [active])
}

function PinGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (value === PIN) {
      localStorage.setItem(PIN_KEY, '1')
      unlockAudio()
      onUnlock()
    } else {
      setError('Incorrect PIN.')
      setValue('')
    }
  }

  return (
    <div className="counter-pin-screen">
      <form className="counter-pin-card" onSubmit={handleSubmit}>
        <h1 className="display">Counter Board</h1>
        <p>Staff only — enter the PIN to continue.</p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError('')
          }}
          placeholder="••••"
        />
        {error && <p className="counter-pin-error">{error}</p>}
        <button type="submit" className="btn btn-green">
          Unlock
        </button>
      </form>
    </div>
  )
}

function OrderRow({ order, now, onCollect }) {
  const status = deriveStatus(order, now)
  const remaining = order.readyAt - now
  const itemCount = order.items.reduce((s, i) => s + i.qty, 0)

  return (
    <div className={`counter-row counter-row-${status}`}>
      <span className="counter-row-token">{order.token}</span>
      <span className="counter-row-name">{order.name}</span>
      <span className="counter-row-items">{itemCount} item(s)</span>
      <span className="counter-row-status">
        {status === 'ready' ? '✅ Ready' : `⏱ ${formatClock(remaining)}`}
      </span>
      <a
        className="counter-row-whatsapp"
        href={waLink(order.phone, orderReadyText(order))}
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 WhatsApp
      </a>
      <button className="counter-row-collect" onClick={() => onCollect(order.token)}>
        Mark Collected
      </button>
    </div>
  )
}

function Board() {
  const { orders, markCollected } = useOrder()
  const [now, setNow] = useState(Date.now())
  const [newOrderBanner, setNewOrderBanner] = useState(null)
  const seenTokens = useRef(null)

  const [hasNewOrder, setHasNewOrder] = useState(false)
  useTitleFlash(hasNewOrder, '🔔 New Order!')

  useWakeLock(true)

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Covers the "PIN already remembered from a previous visit" case, where
  // PinGate's submit (and its audio unlock) never runs this session.
  useEffect(() => {
    const unlock = () => unlockAudio()
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  useEffect(() => {
    const currentTokens = new Set(orders.map((o) => o.token))
    if (seenTokens.current === null) {
      seenTokens.current = currentTokens
      return
    }
    const fresh = orders.filter((o) => !seenTokens.current.has(o.token))
    seenTokens.current = currentTokens
    if (fresh.length === 0) return

    playChime()
    vibrate()
    setHasNewOrder(true)
    const latest = fresh[fresh.length - 1]
    setNewOrderBanner(latest)
    const timeout = setTimeout(() => setNewOrderBanner(null), 15000)

    if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && document.hidden) {
      const itemCount = latest.items.reduce((s, i) => s + i.qty, 0)
      new Notification('🔔 New House of Buns order', {
        body: `${latest.token} · ${latest.name} · ${itemCount} item(s)`,
      })
    }

    return () => clearTimeout(timeout)
  }, [orders])

  const active = orders.filter((o) => o.status !== 'collected')
  const preparing = active.filter((o) => deriveStatus(o, now) !== 'ready').sort((a, b) => a.readyAt - b.readyAt)
  const ready = active.filter((o) => deriveStatus(o, now) === 'ready').sort((a, b) => a.readyAt - b.readyAt)

  return (
    <div className="counter-page">
      <header className="counter-page-header">
        <h1 className="display">Counter Board</h1>
        <span className="counter-page-count">{active.length} active order(s)</span>
      </header>

      {newOrderBanner && (
        <div className="counter-banner">
          <span>
            🔔 New order <strong>{newOrderBanner.token}</strong> from {newOrderBanner.name} —{' '}
            {newOrderBanner.items.reduce((s, i) => s + i.qty, 0)} item(s)
          </span>
          <button
            className="counter-banner-dismiss"
            onClick={() => {
              setNewOrderBanner(null)
              setHasNewOrder(false)
            }}
          >
            Got it ✕
          </button>
        </div>
      )}

      <div className="counter-columns">
        <section className="counter-section">
          <h2>🍳 New / Preparing ({preparing.length})</h2>
          {preparing.length === 0 ? (
            <p className="counter-empty">Nothing in the kitchen right now.</p>
          ) : (
            <div className="counter-list">
              {preparing.map((order) => (
                <OrderRow order={order} now={now} onCollect={markCollected} key={order.token} />
              ))}
            </div>
          )}
        </section>

        <section className="counter-section">
          <h2>✅ Ready for Pickup ({ready.length})</h2>
          {ready.length === 0 ? (
            <p className="counter-empty">Nothing waiting at the counter.</p>
          ) : (
            <div className="counter-list">
              {ready.map((order) => (
                <OrderRow order={order} now={now} onCollect={markCollected} key={order.token} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default function CounterBoardPage() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(PIN_KEY) === '1')

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />
  return <Board />
}
