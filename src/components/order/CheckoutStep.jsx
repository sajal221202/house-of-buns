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
  const [payError, setPayError] = useState('')

  async function handlePay() {
    setPaying(true)
    setPayError('')

    try {
      if (method === 'counter') {
        const order = await placeOrder({ paymentMethod: method, paymentStatus: 'not_required' })
        onPlaced(order)
        return
      }

      const res = await fetch('/api/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal, name: customer?.name, phone: customer?.phone }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not start payment')

      const { load } = await import('@cashfreepayments/cashfree-js')
      const cashfree = await load({ mode: import.meta.env.VITE_CASHFREE_MODE || 'sandbox' })

      const result = await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: '_modal',
      })

      if (result.error) {
        setPayError('Payment was not completed. Please try again or pay at the counter.')
        return
      }

      const order = await placeOrder({
        paymentMethod: method,
        paymentStatus: 'pending',
        cfOrderId: data.orderId,
      })
      onPlaced(order)
    } catch (err) {
      console.error(err)
      setPayError('Something went wrong starting the payment. Please try again.')
    } finally {
      setPaying(false)
    }
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

      {payError && <p className="order-pay-error">{payError}</p>}

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
