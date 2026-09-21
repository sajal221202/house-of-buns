import { useEffect, useState } from 'react'
import Logo from './Logo'
import OrderModal from './order/OrderModal'
import PromoCodesModal from './order/PromoCodesModal'
import FranchiseModal from './order/FranchiseModal'
import { useOrder } from '../context/OrderContext'

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [promoOpen, setPromoOpen] = useState(false)
  const [franchiseOpen, setFranchiseOpen] = useState(false)
  const { orderModalOpen, openOrderModal, closeOrderModal } = useOrder()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <header id="top" className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <Logo />
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a href={l.href} key={l.label}>
              {l.label}
            </a>
          ))}
          <button className="nav-promo-btn" onClick={() => setPromoOpen(true)}>
            <span className="nav-promo-icon">🎁</span>
            Promo Codes
            <span className="nav-promo-dot" aria-hidden="true" />
          </button>
          <button className="nav-link-plain" onClick={() => setFranchiseOpen(true)}>
            Franchise Enquiry
          </button>
        </nav>
        <button className="btn btn-green nav-order-btn" onClick={openOrderModal}>
          Order Now
        </button>
        <button
          className={`nav-burger ${mobileOpen ? 'is-open' : ''}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <div className="nav-mobile">
          {LINKS.map((l) => (
            <a href={l.href} key={l.label} onClick={closeMobile}>
              {l.label}
            </a>
          ))}
          <button
            className="nav-mobile-btn"
            onClick={() => {
              setPromoOpen(true)
              closeMobile()
            }}
          >
            🎁 Promo Codes
          </button>
          <button
            className="nav-mobile-btn"
            onClick={() => {
              setFranchiseOpen(true)
              closeMobile()
            }}
          >
            Franchise Enquiry
          </button>
          <button
            className="btn btn-green nav-mobile-order"
            onClick={() => {
              openOrderModal()
              closeMobile()
            }}
          >
            Order Now
          </button>
        </div>
      )}

      {orderModalOpen && <OrderModal onClose={closeOrderModal} />}
      {promoOpen && <PromoCodesModal onClose={() => setPromoOpen(false)} />}
      {franchiseOpen && <FranchiseModal onClose={() => setFranchiseOpen(false)} />}
    </header>
  )
}
