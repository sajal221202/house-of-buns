import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const rawBody = await getRawBody(req)
  const signature = req.headers['x-webhook-signature']
  const timestamp = req.headers['x-webhook-timestamp']
  const secret = process.env.CASHFREE_WEBHOOK_SECRET || process.env.CASHFREE_SECRET_KEY

  const expected = crypto
    .createHmac('sha256', secret)
    .update(timestamp + rawBody)
    .digest('base64')

  if (expected !== signature) {
    console.error('Cashfree webhook signature mismatch')
    res.status(401).json({ error: 'Invalid signature' })
    return
  }

  let payload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    res.status(400).json({ error: 'Invalid payload' })
    return
  }

  const cfOrderId = payload?.data?.order?.order_id
  const paymentStatus = payload?.data?.payment?.payment_status

  if (cfOrderId && paymentStatus) {
    const status = paymentStatus === 'SUCCESS' ? 'paid' : 'failed'
    const { error } = await supabase.from('orders').update({ payment_status: status }).eq('cf_order_id', cfOrderId)
    if (error) console.error('Failed to update order payment status from webhook', error)
  }

  res.status(200).json({ status: 'ok' })
}
