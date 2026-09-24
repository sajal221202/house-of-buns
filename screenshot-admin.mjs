import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--window-size=1440,900'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})

await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle0' })
await page.screenshot({ path: '/tmp/admin-1-pin.png' })

// enter PIN
await page.type('input[type="password"]', '2026')
await page.click('button[type="submit"]')
await new Promise((r) => setTimeout(r, 800))
await page.screenshot({ path: '/tmp/admin-2-dashboard.png', fullPage: true })

// click Live Orders tab
const tabs = await page.$$('.admin-nav-item')
for (const t of tabs) {
  const text = await page.evaluate((el) => el.textContent, t)
  if (text.includes('Live Orders')) {
    await t.click()
    break
  }
}
await new Promise((r) => setTimeout(r, 400))
await page.screenshot({ path: '/tmp/admin-3-orders.png', fullPage: true })

// click Franchise Leads tab
const tabs2 = await page.$$('.admin-nav-item')
for (const t of tabs2) {
  const text = await page.evaluate((el) => el.textContent, t)
  if (text.includes('Franchise Leads')) {
    await t.click()
    break
  }
}
await new Promise((r) => setTimeout(r, 600))
await page.screenshot({ path: '/tmp/admin-4-franchise.png', fullPage: true })

console.log('ERRORS:', JSON.stringify(errors))

// mobile check
await page.setViewport({ width: 390, height: 844 })
await new Promise((r) => setTimeout(r, 300))
await page.screenshot({ path: '/tmp/admin-5-mobile.png', fullPage: true })

await browser.close()
