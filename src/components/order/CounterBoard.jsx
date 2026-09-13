import { useEffect, useRef, useState } from 'react'
import { useOrder } from '../../context/OrderContext'
import { deriveStatus } from '../../context/orderStatus'
import { waLink, orderReadyText } from '../../utils/whatsapp'

function formatClock(ms) {
  if (ms <= 0) return '00:00'
  const total = Math.round(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function playChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    const tones = [880, 1180]
    tones.forEach((freq, i) => {
      const start = ctx.currentTime + i * 0.18
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.3, start + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.4)
    })
    setTimeout(() => ctx.close(), 900)
  } catch {
    // Web Audio unavailable — fail silently, the on-screen banner still shows.
  }
}

export default function CounterBoard({ onClose }) {
  const { orders, markCollected } = useOrder()
  const [now, setNow] = useState(Date.now())
  const [newOrderBanner, setNewOrderBanner] = useState(null)
  const seenTokens = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const currentTokens = new Set(orders.map((o) => o.token))
    if (seenTokens.current === null) {
      // First load: just record what's already there, no alert.
      seenTokens.current = currentTokens
      return
    }
    const fresh = orders.filter((o) => !seenTokens.current.has(o.token))
    seenTokens.current = currentTokens
    if (fresh.length === 0) return

    playChime()
    const latest = fresh[fresh.length - 1]
    setNewOrderBanner(latest)
    const timeout = setTimeout(() => setNewOrderBanner(null), 6000)

    if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && document.hidden) {
      const itemCount = latest.items.reduce((s, i) => s + i.qty, 0)
      new Notification('🔔 New House of Buns order', {
        body: `${latest.token} · ${latest.name} · ${itemCount} item(s)`,
      })
    }

    return () => clearTimeout(timeout)
  }, [orders])

  const active = orders
    .filter((o) => o.status !== 'collected')
    .sort((a, b) => a.readyAt - b.readyAt)

  return (
    <div className="order-modal-backdrop" role="dialog" aria-modal="true">
      <div className="order-modal order-modal-wide">
        <button className="order-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2 className="display order-step-title">Counter Board</h2>
        <p className="order-step-sub">Live dine-in queue · match the token, hand over the order, tap collected.</p>

        {newOrderBanner && (
          <div className="order-board-banner">
            🔔 New order <strong>{newOrderBanner.token}</strong> from {newOrderBanner.name} —{' '}
            {newOrderBanner.items.reduce((s, i) => s + i.qty, 0)} item(s)
          </div>
        )}

        {active.length === 0 ? (
          <p className="order-board-empty">No active orders right now.</p>
        ) : (
          <div className="order-board-list">
            {active.map((order) => {
              const status = deriveStatus(order, now)
              const remaining = order.readyAt - now
              return (
                <div className={`order-board-row order-board-row-${status}`} key={order.token}>
                  <span className="order-board-token">{order.token}</span>
                  <span className="order-board-name">{order.name}</span>
                  <span className="order-board-items">
                    {order.items.reduce((s, i) => s + i.qty, 0)} item(s)
                  </span>
                  <span className="order-board-status">
                    {status === 'ready' ? 'Ready for Pickup' : `Preparing · ${formatClock(remaining)}`}
                  </span>
                  <a
                    className="order-board-whatsapp"
                    href={waLink(order.phone, orderReadyText(order))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 WhatsApp
                  </a>
                  <button className="order-board-collect" onClick={() => markCollected(order.token)}>
                    Mark Collected
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
