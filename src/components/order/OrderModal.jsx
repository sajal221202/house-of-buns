import { useEffect, useState } from 'react'
import { useOrder } from '../../context/OrderContext'
import LoginStep from './LoginStep'
import MenuStep from './MenuStep'
import CheckoutStep from './CheckoutStep'
import TokenStep from './TokenStep'

export default function OrderModal({ onClose }) {
  const { customer, activeOrderFor } = useOrder()
  const existingOrder = activeOrderFor(customer?.phone)
  const [step, setStep] = useState(existingOrder ? 'token' : customer ? 'menu' : 'login')
  const [order, setOrder] = useState(existingOrder)

  useEffect(() => {
    if (customer && step === 'login') setStep('menu')
  }, [customer, step])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  function handlePlaced(newOrder) {
    setOrder(newOrder)
    setStep('token')
  }

  return (
    <div className="order-modal-backdrop" role="dialog" aria-modal="true">
      <div className="order-modal">
        <button className="order-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {step === 'login' && <LoginStep />}
        {step === 'menu' && <MenuStep onCheckout={() => setStep('checkout')} />}
        {step === 'checkout' && <CheckoutStep onBack={() => setStep('menu')} onPlaced={handlePlaced} />}
        {step === 'token' && order && (
          <TokenStep order={order} onNewOrder={() => setStep('menu')} onClose={onClose} />
        )}
      </div>
    </div>
  )
}
