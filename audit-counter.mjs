import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
const errors = []
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

await page.setViewport({ width: 420, height: 900 })
await page.goto('https://houseofbuns.co.in/', { waitUntil: 'networkidle0', timeout: 30000 })
await page.evaluate(() => document.querySelector('.featured-item .pcard-add-btn')?.click())
await new Promise((r) => setTimeout(r, 400))
await page.evaluate(() => document.querySelector('.floating-cart')?.click())
await new Promise((r) => setTimeout(r, 400))
await page.evaluate(() => {
  const inputs = document.querySelectorAll('input')
  const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  s.call(inputs[0], 'Audit Counter Test'); inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
  s.call(inputs[1], '9000000002'); inputs[1].dispatchEvent(new Event('input', { bubbles: true }))
  document.querySelector('form')?.requestSubmit()
})
await new Promise((r) => setTimeout(r, 500))
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Review Order')
  btn?.click()
})
await new Promise((r) => setTimeout(r, 500))
await page.evaluate(() => {
  const pills = Array.from(document.querySelectorAll('.order-payment-pill'))
  pills.find((p) => p.textContent.includes('Pay at Counter'))?.click()
})
await new Promise((r) => setTimeout(r, 200))
await page.evaluate(() => document.querySelector('.order-actions-row .order-submit')?.click())
await new Promise((r) => setTimeout(r, 1500))

const onToken = await page.evaluate(() => Boolean(document.querySelector('.order-step-token')))
const token = await page.evaluate(() => document.querySelector('.order-token-number')?.textContent || null)
console.log('Reached token/confirmation step:', onToken, '| token:', token)
console.log('Console errors:', errors.length ? errors : 'none')
await browser.close()
