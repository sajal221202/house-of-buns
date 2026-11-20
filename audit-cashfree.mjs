import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
const netLog = []
const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('response', (res) => {
  if (res.url().includes('/api/')) netLog.push(`${res.status()} ${res.url()}`)
})

await page.setViewport({ width: 420, height: 900 })
await page.goto('https://houseofbuns.co.in/', { waitUntil: 'networkidle0', timeout: 30000 })

await page.evaluate(() => document.querySelector('.featured-item .pcard-add-btn')?.click())
await new Promise((r) => setTimeout(r, 400))
await page.evaluate(() => document.querySelector('.floating-cart')?.click())
await new Promise((r) => setTimeout(r, 400))
await page.evaluate(() => {
  const inputs = document.querySelectorAll('input')
  const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  s.call(inputs[0], 'Audit Test'); inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
  s.call(inputs[1], '9000000001'); inputs[1].dispatchEvent(new Event('input', { bubbles: true }))
  document.querySelector('form')?.requestSubmit()
})
await new Promise((r) => setTimeout(r, 500))
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Review Order')
  btn?.click()
})
await new Promise((r) => setTimeout(r, 500))

// Confirm UPI is the selected method by default
const methodActive = await page.evaluate(() => document.querySelector('.order-payment-pill.is-active')?.textContent)
console.log('Default selected payment method:', methodActive)

// Click the actual submit button via its specific class
await page.evaluate(() => document.querySelector('.order-actions-row .order-submit')?.click())
await new Promise((r) => setTimeout(r, 3000))

const payError = await page.evaluate(() => document.querySelector('.order-pay-error')?.textContent || null)
const stillOnCheckout = await page.evaluate(() => Boolean(document.querySelector('.order-step-checkout')))
const onToken = await page.evaluate(() => Boolean(document.querySelector('.order-step-token')))
console.log('API calls made:', netLog.length ? netLog : 'none')
console.log('Error shown to user:', payError)
console.log('Still on checkout step:', stillOnCheckout, '| reached token step:', onToken)
console.log('Console errors:', errors.length ? errors : 'none')

await page.screenshot({ path: 'audit-cashfree-result.png' })
await browser.close()
