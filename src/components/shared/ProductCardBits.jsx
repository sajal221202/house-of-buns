import { useState } from 'react'
import { CURRENCY, discountPercent } from '../../data/menu'
import { useOrder } from '../../context/OrderContext'

export function WishlistButton({ item, className = '' }) {
  const { wishlist, toggleWishlist } = useOrder()
  const active = wishlist.includes(item.name)
  return (
    <button
      type="button"
      className={`pcard-heart ${active ? 'is-active' : ''} ${className}`}
      onClick={(e) => {
        e.stopPropagation()
        toggleWishlist(item.name)
      }}
      aria-label={active ? `Remove ${item.name} from wishlist` : `Save ${item.name} to wishlist`}
    >
      {active ? '♥' : '♡'}
    </button>
  )
}

export function PrepAndPrice({ item }) {
  const { addToCart } = useOrder()
  const [added, setAdded] = useState(false)
  const off = discountPercent(item)

  function handleAdd(e) {
    e.stopPropagation()
    addToCart(item)
    setAdded(true)
    window.clearTimeout(handleAdd._t)
    handleAdd._t = window.setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="pcard-footer">
      {item.prepTime && <span className="pcard-prep">⚡ {item.prepTime}</span>}
      <div className="pcard-price-row">
        {off > 0 && <span className="pcard-off">{off}% OFF</span>}
        <span className="pcard-price">
          {CURRENCY}
          {item.price}
        </span>
        {item.mrp > item.price && (
          <span className="pcard-mrp">
            {CURRENCY}
            {item.mrp}
          </span>
        )}
      </div>
      <button type="button" className={`pcard-add-btn ${added ? 'is-added' : ''}`} onClick={handleAdd}>
        {added ? 'Added ✓' : 'Add to Order'}
      </button>
    </div>
  )
}
