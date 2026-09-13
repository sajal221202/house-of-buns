import { useState } from 'react'
import { useOrder } from '../../context/OrderContext'

export default function LoginStep() {
  const { login } = useOrder()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()
    if (trimmedName.length < 2) {
      setError('Enter your name to continue.')
      return
    }
    if (!/^\d{10}$/.test(trimmedPhone)) {
      setError('Enter a valid 10-digit phone number.')
      return
    }
    login(trimmedName, trimmedPhone)
  }

  return (
    <div className="order-step order-step-login">
      <h2 className="display order-step-title">Dine-In Login</h2>
      <p className="order-step-sub">
        Quick check-in so we know who to call when your order is ready. Table service only — no delivery.
      </p>
      <form onSubmit={handleSubmit} className="order-form">
        <label className="order-field">
          <span>Your Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            autoFocus
          />
        </label>
        <label className="order-field">
          <span>Phone Number</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
            placeholder="10-digit mobile number"
          />
        </label>
        {error && <p className="order-error">{error}</p>}
        <button type="submit" className="btn btn-green order-submit">
          Continue to Menu
        </button>
      </form>
    </div>
  )
}
