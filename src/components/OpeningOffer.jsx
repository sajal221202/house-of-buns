import { useState } from 'react'
import comboCutout from '../assets/photos/combo-cutout-2.png'
import { useOrder } from '../context/OrderContext'
import PromoCodesModal from './order/PromoCodesModal'

export default function OpeningOffer() {
  const { openOrderModal } = useOrder()
  const [promoOpen, setPromoOpen] = useState(false)

  return (
    <section className="offer">
      <div className="offer-confetti" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="wrap offer-inner">
        <div className="offer-photo">
          <img src={comboCutout} alt="House of Buns burger, fries, and a cold drink" loading="lazy" />
        </div>
        <div className="offer-copy">
          <span className="offer-eyebrow">🎉 Now Open</span>
          <h2 className="display offer-title">
            Fresh Off The Griddle.
            <br />
            <span className="offer-title-accent">Opening Offer.</span>
          </h2>
          <p className="offer-sub">
            Celebrate our grand opening — flat 20% off your first dine-in order this week. Walk in, scan the
            menu, and taste the hype.
          </p>
          <div className="offer-actions">
            <button className="btn btn-green" onClick={openOrderModal}>
              Order Now
            </button>
            <button className="offer-btn-outline" onClick={() => setPromoOpen(true)}>
              View Promo Codes
            </button>
          </div>
        </div>
      </div>

      {promoOpen && <PromoCodesModal onClose={() => setPromoOpen(false)} />}
    </section>
  )
}
