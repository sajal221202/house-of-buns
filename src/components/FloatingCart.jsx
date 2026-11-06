import { useOrder } from '../context/OrderContext'
import { CURRENCY } from '../data/menu'

export default function FloatingCart() {
  const { cartCount, cartTotal, openOrderModal } = useOrder()

  if (cartCount === 0) return null

  return (
    <button className="floating-cart" onClick={openOrderModal}>
      <span className="floating-cart-icon">🛒</span>
      <span className="floating-cart-info">
        <span className="floating-cart-count">
          {cartCount} item{cartCount === 1 ? '' : 's'}
        </span>
        <span className="floating-cart-total">
          {CURRENCY}
          {cartTotal}
        </span>
      </span>
      <span className="floating-cart-cta">View Cart →</span>
    </button>
  )
}
