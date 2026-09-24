import { useEffect, useRef, useState } from 'react'

// Browsers block audio from a freshly-created AudioContext until it's been
// resumed inside a real user gesture (a click/tap). We create ONE shared
// context and unlock it the moment staff submits the PIN — after that,
// reusing this same context lets the chime actually play unattended later.
let sharedAudioCtx = null

export function unlockAudio() {
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

// A louder, more urgent 3-burst chime so it's hard to miss even in a noisy shop.
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

export function useTitleFlash(active, message) {
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

export function useWakeLock(active) {
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

// Watches `orders` for newly-appeared tokens and fires chime + vibration +
// OS notification + an on-screen banner. Lives at the portal shell level so
// it keeps working no matter which admin tab is currently open.
export function useOrderAlerts(orders) {
  const [banner, setBanner] = useState(null)
  const [hasNewOrder, setHasNewOrder] = useState(false)
  const seenTokens = useRef(null)

  useTitleFlash(hasNewOrder, '🔔 New Order!')

  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Covers the "PIN already remembered from a previous visit" case, where
  // the PIN form's submit (and its audio unlock) never runs this session.
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
    setBanner(latest)
    const timeout = setTimeout(() => setBanner(null), 15000)

    if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && document.hidden) {
      const itemCount = latest.items.reduce((s, i) => s + i.qty, 0)
      new Notification('🔔 New House of Buns order', {
        body: `${latest.token} · ${latest.name} · ${itemCount} item(s)`,
      })
    }

    return () => clearTimeout(timeout)
  }, [orders])

  function dismissBanner() {
    setBanner(null)
    setHasNewOrder(false)
  }

  return { banner, dismissBanner }
}
