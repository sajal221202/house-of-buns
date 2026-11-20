import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
const errors = []
const netLog = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push('PAGEERROR: ' + String(err)))
page.on('response', (res) => {
  if (res.url().includes('/api/')) netLog.push(`${res.status()} ${res.url()}`)
})

await page.setViewport({ width: 420, height: 900 })
await page.goto('https://houseofbuns.co.in/', { waitUntil: 'networkidle0', timeout: 30000 })

// Add an item from the homepage (Featured Buns)
await page.evaluate(() => {
  const btn = document.querySelector('.featured-item .pcard-add-btn')
  btn?.click()
})
await new Promise((r) => setTimeout(r, 500))
const floatingCartVisible = await page.evaluate(() => Boolean(document.querySelector('.floating-cart')))
console.log('Floating cart appears after add:', floatingCartVisible)

// Open cart -> login
await page.evaluate(() => document.querySelector('.floating-cart')?.click())
await new Promise((r) => setTimeout(r, 500))
await page.evaluate(() => {
  const inputs = document.querySelectorAll('input')
  const setVal = (el, val) => {
    const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    s.call(el, val)
    el.dispatchEvent(new Event('input', { bubbles: true }))
  }
  setVal(inputs[0], 'Audit Test')
  setVal(inputs[1], '9000000001')
  document.querySelector('form')?.requestSubmit()
})
await new Promise((r) => setTimeout(r, 600))
const onMenuStep = await page.evaluate(() => Boolean(document.querySelector('.order-step-menu')))
console.log('Reached menu/cart review step:', onMenuStep)

// Go to checkout
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Review Order')
  btn?.click()
})
await new Promise((r) => setTimeout(r, 500))
const onCheckout = await page.evaluate(() => Boolean(document.querySelector('.order-step-checkout')))
console.log('Reached checkout step:', onCheckout)

// Try UPI payment (default selected) -> should hit /api/cashfree/create-order
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.includes('Pay'))
  btn?.click()
})
await new Promise((r) => setTimeout(r, 2500))
const payErrorText = await page.evaluate(() => document.querySelector('.order-pay-error')?.textContent || null)
console.log('Payment attempt result (error shown to user):', payErrorText)
console.log('API calls made:', netLog.length ? netLog : 'none')
console.log('Console/page errors during flow:', errors.length ? errors : 'none')

await page.screenshot({ path: 'audit-checkout-result.png' })
await browser.close()
