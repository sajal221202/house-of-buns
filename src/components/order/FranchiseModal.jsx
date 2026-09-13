import { useState } from 'react'
import { waLink, RESTAURANT_WHATSAPP_NUMBER } from '../../utils/whatsapp'

export default function FranchiseModal({ onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', city: '', budget: '' })

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const text = [
      '🏠 Franchise Enquiry — House of Buns',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `City: ${form.city}`,
      `Investment Budget: ${form.budget || 'Not specified'}`,
    ].join('\n')
    window.open(waLink(RESTAURANT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div className="order-modal-backdrop" role="dialog" aria-modal="true">
      <div className="order-modal">
        <button className="order-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2 className="display order-step-title">Franchise Enquiry</h2>
        <p className="order-step-sub">
          Want to bring House of Buns to your city? Tell us a bit about you and we&rsquo;ll reach out on
          WhatsApp.
        </p>

        <form className="order-form" onSubmit={handleSubmit}>
          <label className="order-field">
            <span>Your Name</span>
            <input type="text" required value={form.name} onChange={update('name')} placeholder="e.g. Priya Sharma" />
          </label>
          <label className="order-field">
            <span>Phone Number</span>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={update('phone')}
              placeholder="10-digit mobile number"
            />
          </label>
          <label className="order-field">
            <span>City You&rsquo;re Interested In</span>
            <input type="text" required value={form.city} onChange={update('city')} placeholder="e.g. Bhopal" />
          </label>
          <label className="order-field">
            <span>Investment Budget (optional)</span>
            <input type="text" value={form.budget} onChange={update('budget')} placeholder="e.g. ₹15-20 Lakhs" />
          </label>
          <button type="submit" className="btn btn-green order-submit">
            Send Enquiry on WhatsApp
          </button>
        </form>
      </div>
    </div>
  )
}
