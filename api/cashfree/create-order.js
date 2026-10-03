const CASHFREE_BASE_URL =
  process.env.CASHFREE_ENV === 'production' ? 'https://api.cashfree.com' : 'https://sandbox.cashfree.com'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const appId = process.env.CASHFREE_APP_ID
  const secretKey = process.env.CASHFREE_SECRET_KEY
  if (!appId || !secretKey) {
    res.status(500).json({ error: 'Cashfree is not configured on the server yet' })
    return
  }

  const { amount, name, phone } = req.body || {}
  if (!amount || !phone) {
    res.status(400).json({ error: 'Missing amount or phone' })
    return
  }

  const orderId = `HBPAY${Date.now()}${Math.floor(Math.random() * 1000)}`
  const origin = `https://${req.headers.host}`

  try {
    const cfRes = await fetch(`${CASHFREE_BASE_URL}/pg/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': appId,
        'x-client-secret': secretKey,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: phone.replace(/\D/g, '') || `guest${Date.now()}`,
          customer_phone: phone,
          customer_name: name || 'Guest',
        },
        order_meta: {
          notify_url: `${origin}/api/cashfree/webhook`,
        },
      }),
    })

    const data = await cfRes.json()
    if (!cfRes.ok) {
      console.error('Cashfree create-order failed', data)
      res.status(502).json({ error: data.message || 'Cashfree order creation failed' })
      return
    }

    res.status(200).json({ orderId, paymentSessionId: data.payment_session_id })
  } catch (err) {
    console.error('Cashfree create-order error', err)
    res.status(500).json({ error: 'Server error creating payment order' })
  }
}
