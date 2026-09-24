import { useEffect, useState } from 'react'
import { useOrder } from '../context/OrderContext'
import { deriveStatus } from '../context/orderStatus'
import { waLink, orderReadyText } from '../utils/whatsapp'

function formatClock(ms) {
  if (ms <= 0) return '00:00'
  const total = Math.round(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function OrderRow({ order, now, onCollect }) {
  const status = deriveStatus(order, now)
  const remaining = order.readyAt - now
  const itemCount = order.items.reduce((s, i) => s + i.qty, 0)

  return (
    <div className={`admin-order-row admin-order-row-${status}`}>
      <span className="admin-order-token">{order.token}</span>
      <span className="admin-order-name">{order.name}</span>
      <span className="admin-order-items">{itemCount} item(s)</span>
      <span className="admin-order-status">{status === 'ready' ? '✅ Ready' : `⏱ ${formatClock(remaining)}`}</span>
      <a
        className="admin-order-whatsapp"
        href={waLink(order.phone, orderReadyText(order))}
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 WhatsApp
      </a>
      <button className="admin-order-collect" onClick={() => onCollect(order.token)}>
        Mark Collected
      </button>
    </div>
  )
}

export default function AdminOrders() {
  const { orders, markCollected } = useOrder()
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const active = orders.filter((o) => o.status !== 'collected')
  const preparing = active.filter((o) => deriveStatus(o, now) !== 'ready').sort((a, b) => a.readyAt - b.readyAt)
  const ready = active.filter((o) => deriveStatus(o, now) === 'ready').sort((a, b) => a.readyAt - b.readyAt)

  return (
    <div className="admin-orders">
      <div className="admin-orders-columns">
        <section className="admin-panel">
          <h2>🍳 New / Preparing ({preparing.length})</h2>
          {preparing.length === 0 ? (
            <p className="admin-empty">Nothing in the kitchen right now.</p>
          ) : (
            <div className="admin-order-list">
              {preparing.map((order) => (
                <OrderRow order={order} now={now} onCollect={markCollected} key={order.token} />
              ))}
            </div>
          )}
        </section>

        <section className="admin-panel">
          <h2>✅ Ready for Pickup ({ready.length})</h2>
          {ready.length === 0 ? (
            <p className="admin-empty">Nothing waiting at the counter.</p>
          ) : (
            <div className="admin-order-list">
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
