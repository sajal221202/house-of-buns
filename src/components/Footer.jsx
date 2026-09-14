import { useState } from 'react'
import logoFullWhite from '../assets/logo-full-white.png'
import { FLAGSHIP_ADDRESS } from '../data/menu'
import { FAQ_ITEMS, PRIVACY_POLICY, TERMS_CONDITIONS, REFUND_POLICY } from '../data/policies'
import { waLink, RESTAURANT_WHATSAPP_NUMBER } from '../utils/whatsapp'
import { supabase } from '../lib/supabaseClient'
import InfoModal from './order/InfoModal'

const USEFUL_LINKS = [
  { key: 'faq', label: 'FAQ' },
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'terms', label: 'Terms & Conditions' },
  { key: 'refund', label: 'Refund Policy' },
]
const PAYMENT_METHODS = ['Cash', 'UPI', 'Card', 'Paytm', 'Google Pay']

const CALL_HREF = RESTAURANT_WHATSAPP_NUMBER ? `tel:+${RESTAURANT_WHATSAPP_NUMBER}` : undefined
const DISPLAY_NUMBER = RESTAURANT_WHATSAPP_NUMBER
  ? `+${RESTAURANT_WHATSAPP_NUMBER.slice(0, 2)} ${RESTAURANT_WHATSAPP_NUMBER.slice(2)}`
  : 'Coming soon'

export default function Footer() {
  const [openModal, setOpenModal] = useState(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | saving | done | error

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('saving')
    if (!supabase) {
      setStatus('error')
      return
    }
    const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim() })
    if (error && error.code !== '23505') {
      // 23505 = already subscribed (unique violation) — treat as success
      console.error('Newsletter signup failed', error)
      setStatus('error')
      return
    }
    setStatus('done')
    setEmail('')
  }

  return (
    <footer id="contact" className="footer">
      <div className="wrap footer-top">
        <img src={logoFullWhite} alt="House of Buns" className="footer-logo" loading="lazy" />
      </div>

      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee-track">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i}>HOUSE OF BUNS</span>
          ))}
        </div>
      </div>

      <div className="wrap footer-columns">
        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            {USEFUL_LINKS.map((item) => (
              <li key={item.key}>
                <button className="footer-link-btn" onClick={() => setOpenModal(item.key)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Payment Methods</h4>
          <div className="footer-payments">
            {PAYMENT_METHODS.map((label) => (
              <span className="footer-payment-badge" key={label}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Address</h4>
          <p className="footer-address">📍 {FLAGSHIP_ADDRESS}</p>
        </div>

        <div className="footer-col">
          <h4>Contact &amp; Connect</h4>
          <p>
            <a href="mailto:hello@houseofbuns.co.in">hello@houseofbuns.co.in</a>
          </p>
          {CALL_HREF && (
            <p>
              <a href={CALL_HREF}>{DISPLAY_NUMBER}</a>
            </p>
          )}
          <p>
            <a
              href={waLink(RESTAURANT_WHATSAPP_NUMBER, "Hi! I'd like to know more about House of Buns.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Chat on WhatsApp
            </a>
          </p>
        </div>
      </div>

      <div className="wrap footer-inner">
        <div>
          <h3>Join our newsletter</h3>
          <p>Get updated on the freshest news!</p>
        </div>
        <form className="footer-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'saving' || status === 'done'}
          />
          <button type="submit" className="btn btn-green" disabled={status === 'saving' || status === 'done'}>
            {status === 'saving' ? 'Saving…' : status === 'done' ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </form>
      </div>
      {status === 'error' && <p className="footer-form-error wrap">Something went wrong — please try again.</p>}

      <div className="footer-bottom">
        <span>📍 Proudly serving Indore — dine-in only</span>
        <span className="footer-bottom-sep">·</span>
        <span>© House of Buns. All rights reserved.</span>
      </div>

      {openModal === 'faq' && <InfoModal title="FAQ" faq={FAQ_ITEMS} onClose={() => setOpenModal(null)} />}
      {openModal === 'privacy' && (
        <InfoModal title="Privacy Policy" paragraphs={PRIVACY_POLICY} onClose={() => setOpenModal(null)} />
      )}
      {openModal === 'terms' && (
        <InfoModal title="Terms & Conditions" paragraphs={TERMS_CONDITIONS} onClose={() => setOpenModal(null)} />
      )}
      {openModal === 'refund' && (
        <InfoModal title="Refund Policy" paragraphs={REFUND_POLICY} onClose={() => setOpenModal(null)} />
      )}
    </footer>
  )
}
