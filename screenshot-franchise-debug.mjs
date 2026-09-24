import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
page.on('response', (r) => {
  if (r.url().includes('franchise_enquiries')) console.log('RESP', r.status(), r.url())
})
page.on('console', (m) => console.log('CONSOLE', m.type(), m.text()))
await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle0' })
await page.type('input[type="password"]', '2026')
await page.click('button[type="submit"]')
await new Promise((r) => setTimeout(r, 500))
const tabs = await page.$$('.admin-nav-item')
for (const t of tabs) {
  const text = await page.evaluate((el) => el.textContent, t)
  if (text.includes('Franchise Leads')) { await t.click(); break }
}
await new Promise((r) => setTimeout(r, 2000))
console.log(await page.evaluate(() => document.querySelector('.admin-panel')?.textContent))
await browser.close()
