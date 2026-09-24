import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

localStorage: await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle0' })
await page.type('input[type="password"]', '2026')
await page.click('button[type="submit"]')
await new Promise((r) => setTimeout(r, 900))
await page.screenshot({ path: '/tmp/check-dashboard.png', fullPage: true })

const tabs = await page.$$('.admin-nav-item')
for (const t of tabs) {
  const text = await page.evaluate((el) => el.textContent, t)
  if (text.includes('Franchise Leads')) { await t.click(); break }
}
await new Promise((r) => setTimeout(r, 1200))
await page.screenshot({ path: '/tmp/check-franchise.png', fullPage: true })

await browser.close()
