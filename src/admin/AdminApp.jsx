import { useState } from 'react'
import { useOrder } from '../context/OrderContext'
import { unlockAudio, useOrderAlerts, useWakeLock } from './notifications'
import AdminDashboard from './AdminDashboard'
import AdminOrders from './AdminOrders'
import AdminFranchise from './AdminFranchise'
import './admin.css'

const PIN = import.meta.env.VITE_COUNTER_PIN || '2026'
const PIN_KEY = 'hob_admin_unlocked'

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'orders', label: 'Live Orders', icon: '🍳' },
  { key: 'franchise', label: 'Franchise Leads', icon: '🏠' },
]

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
    <div className="admin-pin-screen">
      <form className="admin-pin-card" onSubmit={handleSubmit}>
        <span className="admin-pin-badge">🔒 Staff Access</span>
        <h1>House of Buns Admin</h1>
        <p>Enter the staff PIN to continue.</p>
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
        {error && <p className="admin-pin-error">{error}</p>}
        <button type="submit" className="admin-pin-submit">
          Unlock
        </button>
      </form>
    </div>
  )
}

function Shell() {
  const { orders } = useOrder()
  const [tab, setTab] = useState('dashboard')
  const { banner, dismissBanner } = useOrderAlerts(orders)
  const activeCount = orders.filter((o) => o.status !== 'collected').length

  useWakeLock(true)

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">🍔</span>
          <span className="admin-brand-name">House of Buns</span>
          <span className="admin-brand-sub">Admin Portal</span>
        </div>
        <nav className="admin-nav">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`admin-nav-item ${tab === t.key ? 'is-active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              <span className="admin-nav-icon">{t.icon}</span>
              {t.label}
              {t.key === 'orders' && activeCount > 0 && <span className="admin-nav-badge">{activeCount}</span>}
            </button>
          ))}
        </nav>
        <button
          className="admin-nav-logout"
          onClick={() => {
            localStorage.removeItem(PIN_KEY)
            window.location.reload()
          }}
        >
          🔓 Lock Portal
        </button>
      </aside>

      <main className="admin-main">
        {banner && (
          <div className="admin-banner">
            <span>
              🔔 New order <strong>{banner.token}</strong> from {banner.name} —{' '}
              {banner.items.reduce((s, i) => s + i.qty, 0)} item(s)
            </span>
            <button className="admin-banner-dismiss" onClick={dismissBanner}>
              Got it ✕
            </button>
          </div>
        )}

        <header className="admin-topbar">
          <h1>{TABS.find((t) => t.key === tab)?.label}</h1>
        </header>

        {tab === 'dashboard' && <AdminDashboard />}
        {tab === 'orders' && <AdminOrders />}
        {tab === 'franchise' && <AdminFranchise />}
      </main>
    </div>
  )
}

export default function AdminApp() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(PIN_KEY) === '1')

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />
  return <Shell />
}
