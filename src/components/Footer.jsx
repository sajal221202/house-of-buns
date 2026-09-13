import logoFullWhite from '../assets/logo-full-white.png'
import { FLAGSHIP_ADDRESS } from '../data/menu'
import { waLink, RESTAURANT_WHATSAPP_NUMBER } from '../utils/whatsapp'

const USEFUL_LINKS = ['Shipping Policy', 'Privacy Policy', 'Terms & Conditions', 'Refund Policy']
const PAYMENT_METHODS = ['Cash', 'UPI', 'Card', 'Paytm', 'Google Pay']

const CALL_HREF = RESTAURANT_WHATSAPP_NUMBER ? `tel:+${RESTAURANT_WHATSAPP_NUMBER}` : undefined
const DISPLAY_NUMBER = RESTAURANT_WHATSAPP_NUMBER
  ? `+${RESTAURANT_WHATSAPP_NUMBER.slice(0, 2)} ${RESTAURANT_WHATSAPP_NUMBER.slice(2)}`
  : 'Coming soon'

export default function Footer() {
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
            {USEFUL_LINKS.map((label) => (
              <li key={label}>
                <a href="#">{label}</a>
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
          <div className="footer-social">
            <a href="#top" aria-label="Facebook">
              📘
            </a>
            <a href="#top" aria-label="Instagram">
              📸
            </a>
          </div>
        </div>
      </div>

      <div className="wrap footer-inner">
        <div>
          <h3>Join our newsletter</h3>
          <p>Get updated on the freshest news!</p>
        </div>
        <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" aria-label="Email" />
          <button type="submit" className="btn btn-green">
            Subscribe
          </button>
        </form>
      </div>

      <div className="footer-stores">📍 Proudly serving Indore — dine-in only</div>
      <div className="footer-bottom">© House of Buns. All rights reserved.</div>
    </footer>
  )
}
