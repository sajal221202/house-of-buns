import { useEffect, useState } from 'react'
import Logo from './Logo'
import OrderModal from './order/OrderModal'
import CounterBoard from './order/CounterBoard'
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
  const [boardOpen, setBoardOpen] = useState(false)
  const [promoOpen, setPromoOpen] = useState(false)
  const [franchiseOpen, setFranchiseOpen] = useState(false)
  const { orderModalOpen, openOrderModal, closeOrderModal } = useOrder()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('hob_promo_seen')) return
    const id = setTimeout(() => {
      setPromoOpen(true)
      sessionStorage.setItem('hob_promo_seen', '1')
    }, 1800)
    return () => clearTimeout(id)
  }, [])

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
          </button>
          <button className="nav-link-plain" onClick={() => setBoardOpen(true)}>
            Counter Board
          </button>
          <button className="nav-link-plain" onClick={() => setFranchiseOpen(true)}>
            Franchise Enquiry
          </button>
        </nav>
        <button className="btn btn-green nav-order-btn" onClick={openOrderModal}>
          Order Now
        </button>
        <button className="nav-burger" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>

      {orderModalOpen && <OrderModal onClose={closeOrderModal} />}
      {boardOpen && <CounterBoard onClose={() => setBoardOpen(false)} />}
      {promoOpen && <PromoCodesModal onClose={() => setPromoOpen(false)} />}
      {franchiseOpen && <FranchiseModal onClose={() => setFranchiseOpen(false)} />}
    </header>
  )
}
