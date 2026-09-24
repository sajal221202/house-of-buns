import { useMemo } from 'react'
import { useOrder } from '../context/OrderContext'
import { CURRENCY } from '../data/menu'
import BarChart from './charts/BarChart'
import TrendChart from './charts/TrendChart'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function startOfDay(ts) {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function money(n) {
  return `${CURRENCY}${Math.round(n).toLocaleString('en-IN')}`
}

export default function AdminDashboard() {
  const { orders } = useOrder()

  const stats = useMemo(() => {
    const todayStart = startOfDay(Date.now())
    const todayOrders = orders.filter((o) => o.placedAt >= todayStart)
    const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0)
    const allTimeRevenue = orders.reduce((s, o) => s + o.total, 0)
    const avgOrderValue = orders.length ? allTimeRevenue / orders.length : 0
    const activeNow = orders.filter((o) => o.status !== 'collected').length

    const itemTotals = new Map()
    orders.forEach((o) => {
      o.items.forEach((it) => {
        itemTotals.set(it.name, (itemTotals.get(it.name) || 0) + it.qty)
      })
    })
    const topItems = [...itemTotals.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)

    const last7 = []
    for (let i = 6; i >= 0; i--) {
      const dayStart = todayStart - i * 86400000
      const dayEnd = dayStart + 86400000
      const revenue = orders
        .filter((o) => o.placedAt >= dayStart && o.placedAt < dayEnd)
        .reduce((s, o) => s + o.total, 0)
      last7.push({ label: DAY_LABELS[new Date(dayStart).getDay()], value: revenue })
    }

    const recent = [...orders].sort((a, b) => b.placedAt - a.placedAt).slice(0, 8)

    return { todayOrders, todayRevenue, allTimeRevenue, avgOrderValue, activeNow, topItems, last7, recent }
  }, [orders])

  return (
    <div className="admin-dashboard">
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Today's Revenue</span>
          <span className="admin-kpi-value">{money(stats.todayRevenue)}</span>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Today's Orders</span>
          <span className="admin-kpi-value">{stats.todayOrders.length}</span>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Avg Order Value</span>
          <span className="admin-kpi-value">{money(stats.avgOrderValue)}</span>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Active Right Now</span>
          <span className="admin-kpi-value">{stats.activeNow}</span>
        </div>
        <div className="admin-kpi-card admin-kpi-card-wide">
          <span className="admin-kpi-label">All-Time Revenue</span>
          <span className="admin-kpi-value">{money(stats.allTimeRevenue)}</span>
          <span className="admin-kpi-sub">{orders.length} order(s) total</span>
        </div>
      </div>

      <div className="admin-panels">
        <section className="admin-panel">
          <h2>Revenue — Last 7 Days</h2>
          {orders.length === 0 ? (
            <p className="admin-empty">No orders yet.</p>
          ) : (
            <TrendChart data={stats.last7} formatValue={money} />
          )}
        </section>

        <section className="admin-panel">
          <h2>Top Selling Items</h2>
          {stats.topItems.length === 0 ? (
            <p className="admin-empty">No orders yet.</p>
          ) : (
            <BarChart data={stats.topItems} formatValue={(v) => `${v}x`} />
          )}
        </section>
      </div>

      <section className="admin-panel">
        <h2>Recent Orders</h2>
        {stats.recent.length === 0 ? (
          <p className="admin-empty">No orders yet.</p>
        ) : (
          <div className="admin-table">
            <div className="admin-table-head">
              <span>Token</span>
              <span>Customer</span>
              <span>Items</span>
              <span>Total</span>
              <span>Status</span>
            </div>
            {stats.recent.map((o) => (
              <div className="admin-table-row" key={o.token}>
                <span>{o.token}</span>
                <span>{o.name}</span>
                <span>{o.items.reduce((s, i) => s + i.qty, 0)} item(s)</span>
                <span>{money(o.total)}</span>
                <span className={`admin-status-pill admin-status-${o.status}`}>{o.status}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
