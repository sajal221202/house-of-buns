import { useState } from 'react'
import { CURRENCY } from '../../data/menu'
import { useOrder } from '../../context/OrderContext'

const PAYMENT_METHODS = [
  { key: 'upi', label: 'UPI' },
  { key: 'card', label: 'Card' },
  { key: 'counter', label: 'Pay at Counter' },
]

export default function CheckoutStep({ onBack, onPlaced }) {
  const { customer, cart, cartTotal, placeOrder } = useOrder()
  const [method, setMethod] = useState('upi')
  const [paying, setPaying] = useState(false)

  function handlePay() {
    setPaying(true)
    // Simulated payment processing delay
    setTimeout(async () => {
      const order = await placeOrder({ paymentMethod: method })
      setPaying(false)
      onPlaced(order)
    }, 900)
  }

  return (
    <div className="order-step order-step-checkout">
      <h2 className="display order-step-title">Review &amp; Pay</h2>
      <p className="order-step-sub">
        Table service for {customer?.name} · {customer?.phone}
      </p>

      <div className="order-summary-list">
        {cart.map((item) => (
          <div className="order-summary-row" key={item.name}>
            <span>
              {item.qty} × {item.name}
            </span>
            <span>
              {CURRENCY}
              {item.qty * item.price}
            </span>
          </div>
        ))}
        <div className="order-summary-row order-summary-total">
          <span>Total</span>
          <span>
            {CURRENCY}
            {cartTotal}
          </span>
        </div>
      </div>

      <div className="order-payment-methods">
        {PAYMENT_METHODS.map((m) => (
          <button
            key={m.key}
            className={`order-payment-pill ${method === m.key ? 'is-active' : ''}`}
            onClick={() => setMethod(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="order-actions-row">
        <button className="btn btn-dark" onClick={onBack} disabled={paying}>
          Back to Menu
        </button>
        <button className="btn btn-green order-submit" onClick={handlePay} disabled={paying}>
          {paying ? 'Processing…' : `Pay ${CURRENCY}${cartTotal}`}
        </button>
      </div>
    </div>
  )
}
