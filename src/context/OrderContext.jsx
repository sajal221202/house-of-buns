import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { syncOrderToSheet } from '../utils/sheetSync'

const OrderContext = createContext(null)

const CUSTOMER_KEY = 'hob_customer'
const TOKEN_SEQ_KEY = 'hob_token_seq'
const WISHLIST_KEY = 'hob_wishlist'

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function nextToken() {
  const dateKey = new Date().toISOString().slice(0, 10)
  let seq = loadJSON(TOKEN_SEQ_KEY, null)
  if (!seq || seq.date !== dateKey) seq = { date: dateKey, n: 0 }
  seq.n += 1
  localStorage.setItem(TOKEN_SEQ_KEY, JSON.stringify(seq))
  return `HB-${String(seq.n).padStart(3, '0')}`
}

function fromRow(row) {
  return {
    token: row.token,
    name: row.name,
    phone: row.phone,
    items: row.items,
    total: Number(row.total),
    paymentMethod: row.payment_method,
    placedAt: new Date(row.placed_at).getTime(),
    readyAt: new Date(row.ready_at).getTime(),
    prepMinutes: row.prep_minutes,
    counter: row.counter,
    status: row.status,
  }
}

function toRow(order) {
  return {
    token: order.token,
    name: order.name,
    phone: order.phone,
    items: order.items,
    total: order.total,
    payment_method: order.paymentMethod,
    placed_at: new Date(order.placedAt).toISOString(),
    ready_at: new Date(order.readyAt).toISOString(),
    prep_minutes: order.prepMinutes,
    counter: order.counter,
    status: order.status,
  }
}

export function OrderProvider({ children }) {
  const [customer, setCustomer] = useState(() => loadJSON(CUSTOMER_KEY, null))
  const [cart, setCart] = useState({})
  const [orders, setOrders] = useState([])
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [wishlist, setWishlist] = useState(() => loadJSON(WISHLIST_KEY, []))

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (customer) localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer))
  }, [customer])

  // Orders are shared across every device via Supabase (not localStorage), with a
  // realtime subscription so a new order placed on any phone shows up instantly
  // on the Counter Board, wherever that's open.
  useEffect(() => {
    if (!supabase) return undefined

    let cancelled = false

    async function load() {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: true })
      if (!cancelled && !error && data) setOrders(data.map(fromRow))
      if (error) console.error('Failed to load orders from Supabase', error)
    }
    load()

    const channel = supabase
      .channel('orders-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        setOrders((prev) => {
          if (payload.eventType === 'DELETE') {
            return prev.filter((o) => o.token !== payload.old.token)
          }
          const updated = fromRow(payload.new)
          const exists = prev.some((o) => o.token === updated.token)
          return exists ? prev.map((o) => (o.token === updated.token ? updated : o)) : [...prev, updated]
        })
      })
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  function toggleWishlist(name) {
    setWishlist((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))
  }

  function login(name, phone) {
    setCustomer({ name, phone })
  }

  function logout() {
    setCustomer(null)
    localStorage.removeItem(CUSTOMER_KEY)
  }

  function addToCart(item) {
    setCart((c) => {
      const existing = c[item.name]
      const qty = (existing?.qty || 0) + 1
      return { ...c, [item.name]: { name: item.name, price: item.price, photo: item.photo, qty } }
    })
  }

  function decrementFromCart(item) {
    setCart((c) => {
      const existing = c[item.name]
      if (!existing) return c
      if (existing.qty <= 1) {
        const next = { ...c }
        delete next[item.name]
        return next
      }
      return { ...c, [item.name]: { ...existing, qty: existing.qty - 1 } }
    })
  }

  function clearCart() {
    setCart({})
  }

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0)

  async function placeOrder({ paymentMethod }) {
    const now = Date.now()
    const activeAhead = orders.filter((o) => o.status !== 'collected' && o.readyAt > now).length
    const baseMinutes = 6
    const perItemMinutes = 1.5
    const queueMinutes = Math.min(activeAhead * 2, 12)
    const prepMinutes = Math.round(baseMinutes + cartCount * perItemMinutes + queueMinutes)
    const readyAt = now + prepMinutes * 60 * 1000

    const draft = {
      name: customer?.name || 'Guest',
      phone: customer?.phone || '',
      items: cartItems,
      total: cartTotal,
      paymentMethod,
      placedAt: now,
      readyAt,
      prepMinutes,
      counter: 'Counter 1 · Dine-In Pickup',
      status: 'preparing',
    }

    let order
    if (supabase) {
      // Let the database hand out the token (via a shared sequence) so two
      // customers on two different devices can never both get "HB-001".
      const { data, error } = await supabase.from('orders').insert(toRow(draft)).select().single()
      if (error) {
        console.error('Failed to sync order to Supabase, falling back to a local-only token', error)
        order = { ...draft, token: nextToken() }
      } else {
        order = fromRow(data)
      }
    } else {
      order = { ...draft, token: nextToken() }
    }

    setOrders((prev) => [...prev, order])
    clearCart()
    syncOrderToSheet(order)
    return order
  }

  async function markCollected(token) {
    setOrders((prev) => prev.map((o) => (o.token === token ? { ...o, status: 'collected' } : o)))
    if (supabase) {
      const { error } = await supabase.from('orders').update({ status: 'collected' }).eq('token', token)
      if (error) console.error('Failed to update order status', error)
    }
  }

  function activeOrderFor(phone) {
    if (!phone) return null
    const mine = orders.filter((o) => o.phone === phone && o.status !== 'collected')
    return mine.length ? mine[mine.length - 1] : null
  }

  const value = {
    customer,
    login,
    logout,
    orderModalOpen,
    openOrderModal: () => setOrderModalOpen(true),
    closeOrderModal: () => setOrderModalOpen(false),
    cart: cartItems,
    cartCount,
    cartTotal,
    addToCart,
    decrementFromCart,
    clearCart,
    orders,
    placeOrder,
    markCollected,
    activeOrderFor,
    wishlist,
    toggleWishlist,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used within OrderProvider')
  return ctx
}
