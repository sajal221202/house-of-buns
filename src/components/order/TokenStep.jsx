import { useEffect, useState } from 'react'
import { CURRENCY } from '../../data/menu'
import { deriveStatus } from '../../context/orderStatus'
import { waLink, orderSummaryText, RESTAURANT_WHATSAPP_NUMBER } from '../../utils/whatsapp'
import mascotGreen from '../../assets/mascot-green.png'

const STEPS = ['Order Received', 'Preparing', 'Ready for Pickup']

function formatClock(ms) {
  const total = Math.max(0, Math.round(ms / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function TokenStep({ order, onNewOrder, onClose }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const remaining = order.readyAt - now
  const status = deriveStatus(order, now)
  const isReady = status === 'ready' || window.__forceReady
  const isCollected = status === 'collected'
  const elapsed = now - order.placedAt
  const totalSpan = order.readyAt - order.placedAt
  const progress = isCollected ? 1 : Math.min(1, Math.max(0, elapsed / totalSpan))
  const stepIndex = isCollected ? 2 : isReady ? 2 : progress > 0.15 ? 1 : 0

  return (
    <div className="order-step order-step-token">
      {isReady && <img src={mascotGreen} alt="" aria-hidden="true" className="order-token-mascot" />}
      <span className="order-token-label">Your Token</span>
      <div className="order-token-number">{order.token}</div>

      <div className="order-progress-track">
        {STEPS.map((label, i) => (
          <div key={label} className={`order-progress-step ${i <= stepIndex ? 'is-done' : ''}`}>
            <span className="order-progress-dot" />
            <span>{label}</span>
          </div>
        ))}
        <div className="order-progress-fill" style={{ width: `${(stepIndex / (STEPS.length - 1)) * 100}%` }} />
      </div>

      {isCollected ? (
        <p className="order-token-status">Order collected. Thanks for dining with House of Buns!</p>
      ) : isReady ? (
        <p className="order-token-status order-token-status-ready">
          🎉 Ready! Head to <strong>{order.counter}</strong> and show token {order.token}.
        </p>
      ) : (
        <>
          <p className="order-token-status">
            Estimated ready in <strong>{formatClock(remaining)}</strong> · head to{' '}
            <strong>{order.counter}</strong> when called.
          </p>
        </>
      )}

      <div className="order-summary-list order-token-items">
        {order.items.map((item) => (
          <div className="order-summary-row" key={item.name}>
            <span>
              {item.qty} × {item.name}
            </span>
            <span>
              {CURRENCY}
              {item.qty * item.price}
            </span>
          </div>
        ))}
        <div className="order-summary-row order-summary-total">
          <span>Total Paid</span>
          <span>
            {CURRENCY}
            {order.total}
          </span>
        </div>
      </div>

      <div className="order-whatsapp-row">
        <a
          className="order-whatsapp-btn"
          href={waLink(RESTAURANT_WHATSAPP_NUMBER, orderSummaryText(order))}
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 Notify Counter on WhatsApp
        </a>
        <a
          className="order-whatsapp-btn order-whatsapp-btn-outline"
          href={waLink('', orderSummaryText(order))}
          target="_blank"
          rel="noopener noreferrer"
        >
          📲 Save Order to My WhatsApp
        </a>
      </div>

      <div className="order-actions-row">
        <button className="btn btn-dark" onClick={onNewOrder}>
          Place Another Order
        </button>
        <button className="btn btn-green order-submit" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  )
}
