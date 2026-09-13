import { useState } from 'react'
import { PROMO_CODES } from '../../data/menu'

export default function PromoCodesModal({ onClose }) {
  const [copied, setCopied] = useState(null)

  function copyCode(code) {
    navigator.clipboard?.writeText(code).catch(() => {})
    setCopied(code)
    window.setTimeout(() => setCopied((c) => (c === code ? null : c)), 1500)
  }

  return (
    <div className="order-modal-backdrop" role="dialog" aria-modal="true">
      <div className="order-modal">
        <button className="order-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2 className="display order-step-title">Promo Codes</h2>
        <p className="order-step-sub">Show these at the counter, or apply them when you check out.</p>

        <div className="promo-list">
          {PROMO_CODES.map((p) => (
            <div className="promo-card" key={p.code}>
              <span className="promo-tag">{p.tag}</span>
              <div className="promo-code-row">
                <span className="promo-code">{p.code}</span>
                <button className="promo-copy-btn" onClick={() => copyCode(p.code)}>
                  {copied === p.code ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
              <p className="promo-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
