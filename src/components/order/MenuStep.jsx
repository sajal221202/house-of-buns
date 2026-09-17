import { useState } from 'react'
import { FEATURED_BURGERS, SIDES, DRINKS, GLASS_BOTTLE_DRINKS, CAN_DRINKS, CURRENCY } from '../../data/menu'
import { useOrder } from '../../context/OrderContext'

const SECTIONS = [
  { key: 'burgers', label: 'Featured Buns', icon: '🍔', items: FEATURED_BURGERS },
  { key: 'sides', label: 'On The Side', icon: '🍟', items: SIDES },
  { key: 'drinks', label: 'House Specials', icon: '☕', items: DRINKS },
  { key: 'glass-bottles', label: 'Glass Bottles', icon: '🍾', items: GLASS_BOTTLE_DRINKS },
  { key: 'cans', label: 'Chilled Cans', icon: '🥤', items: CAN_DRINKS },
]

export default function MenuStep({ onCheckout }) {
  const { cart, cartCount, cartTotal, addToCart, decrementFromCart } = useOrder()
  const [openKey, setOpenKey] = useState(null)

  function qtyFor(name) {
    const found = cart.find((i) => i.name === name)
    return found?.qty || 0
  }

  function itemsInCart(section) {
    return section.items.reduce((sum, item) => sum + qtyFor(item.name), 0)
  }

  return (
    <div className="order-step order-step-menu">
      <h2 className="display order-step-title">Build Your Order</h2>
      <p className="order-step-sub">Dine-in only — grab a table, order here, and we'll call your token when it's ready.</p>

      <div className="order-menu-scroll">
        {SECTIONS.map((section) => {
          const isOpen = openKey === section.key
          const inCart = itemsInCart(section)
          return (
            <div className={`order-cat ${isOpen ? 'is-open' : ''}`} key={section.key}>
              <button
                type="button"
                className="order-cat-head"
                onClick={() => setOpenKey(isOpen ? null : section.key)}
                aria-expanded={isOpen}
              >
                <span className="order-cat-icon">{section.icon}</span>
                <span className="order-cat-info">
                  <span className="order-cat-label">{section.label}</span>
                  <span className="order-cat-sub">
                    {section.items.length} items{inCart > 0 ? ` · ${inCart} in cart` : ''}
                  </span>
                </span>
                <span className="order-cat-chevron" aria-hidden="true">
                  ⌄
                </span>
              </button>

              {isOpen && (
                <div className="order-cat-body">
                  <div className="order-menu-grid">
                    {section.items.map((item) => {
                      const qty = qtyFor(item.name)
                      return (
                        <div className="order-menu-item" key={item.name}>
                          <div className="order-menu-item-photo">
                            <img src={item.photo} alt={item.name} loading="lazy" />
                          </div>
                          <div className="order-menu-item-info">
                            <span className="order-menu-item-name">{item.name}</span>
                            <span className="order-menu-item-price">
                              {CURRENCY}
                              {item.price}
                            </span>
                          </div>
                          {qty === 0 ? (
                            <button className="order-add-btn" onClick={() => addToCart(item)}>
                              Add
                            </button>
                          ) : (
                            <div className="order-qty-stepper">
                              <button onClick={() => decrementFromCart(item)} aria-label={`Remove one ${item.name}`}>
                                −
                              </button>
                              <span>{qty}</span>
                              <button onClick={() => addToCart(item)} aria-label={`Add one ${item.name}`}>
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="order-cart-bar">
        <div className="order-cart-summary">
          <span>{cartCount} item{cartCount === 1 ? '' : 's'}</span>
          <span className="order-cart-total">
            {CURRENCY}
            {cartTotal}
          </span>
        </div>
        <button className="btn btn-green order-submit" disabled={cartCount === 0} onClick={onCheckout}>
          Review Order
        </button>
      </div>
    </div>
  )
}
