import { useMemo } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart as RBarChart,
  Bar,
  Cell,
} from 'recharts'
import { useOrder } from '../context/OrderContext'
import { CURRENCY } from '../data/menu'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const GREEN = '#1f6b3f'
const GREEN_DARK = '#123d24'

function startOfDay(ts) {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function money(n) {
  return `${CURRENCY}${Math.round(n).toLocaleString('en-IN')}`
}

function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="admin-chart-tooltip">
      <strong>{label}</strong>
      <span>{money(payload[0].value)}</span>
    </div>
  )
}

function ItemsTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const p = payload[0]
  return (
    <div className="admin-chart-tooltip">
      <strong>{p.payload.label}</strong>
      <span>{p.value} sold</span>
    </div>
  )
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
      .map(([label, value]) => ({ label: label.length > 14 ? `${label.slice(0, 13)}…` : label, value }))
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
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={stats.last7} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GREEN} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={GREEN} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(18,61,36,0.1)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 12, fill: 'rgba(13,46,27,0.58)' }}
                  axisLine={{ stroke: 'rgba(18,61,36,0.16)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'rgba(13,46,27,0.58)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${CURRENCY}${v}`}
                  width={54}
                />
                <Tooltip content={<RevenueTooltip />} cursor={{ stroke: GREEN, strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={GREEN_DARK}
                  strokeWidth={2}
                  fill="url(#revenueFill)"
                  dot={{ r: 3, fill: GREEN_DARK, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="admin-panel">
          <h2>Top Selling Items</h2>
          {stats.topItems.length === 0 ? (
            <p className="admin-empty">No orders yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <RBarChart
                data={stats.topItems}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                barCategoryGap="28%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(18,61,36,0.1)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fontSize: 12, fill: 'rgba(13,46,27,0.75)' }}
                  axisLine={false}
                  tickLine={false}
                  width={130}
                  interval={0}
                />
                <Tooltip content={<ItemsTooltip />} cursor={{ fill: 'rgba(31,107,63,0.06)' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
                  {stats.topItems.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? GREEN_DARK : GREEN} fillOpacity={1 - i * 0.12} />
                  ))}
                </Bar>
              </RBarChart>
            </ResponsiveContainer>
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
