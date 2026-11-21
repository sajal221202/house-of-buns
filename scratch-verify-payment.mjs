import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
await page.setViewport({ width: 420, height: 800 })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' })
await page.evaluate(() => document.querySelector('.featured-item .pcard-add-btn')?.click())
await new Promise((r) => setTimeout(r, 300))
await page.evaluate(() => document.querySelector('.floating-cart')?.click())
await new Promise((r) => setTimeout(r, 300))
await page.evaluate(() => {
  const inputs = document.querySelectorAll('input')
  const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  s.call(inputs[0], 'Verify'); inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
  s.call(inputs[1], '9000000009'); inputs[1].dispatchEvent(new Event('input', { bubbles: true }))
  document.querySelector('form')?.requestSubmit()
})
await new Promise((r) => setTimeout(r, 400))
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Review Order')
  btn?.click()
})
await new Promise((r) => setTimeout(r, 400))

const pills = await page.evaluate(() => Array.from(document.querySelectorAll('.order-payment-pill')).map((p) => p.textContent))
console.log('Payment methods shown:', pills)
await page.screenshot({ path: 'scratch-payment-methods.png' })
await browser.close()
