import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
await page.goto('https://admin.houseofbuns.co.in/', { waitUntil: 'networkidle0', timeout: 30000 })
await page.evaluate(() => {
  const input = document.querySelector('.admin-pin-card input')
  const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  s.call(input, '2026')
  input.dispatchEvent(new Event('input', { bubbles: true }))
  document.querySelector('.admin-pin-card').requestSubmit()
})
await new Promise((r) => setTimeout(r, 1000))

const stats = await page.evaluate(() => {
  const rows = document.querySelectorAll('.admin-table-row')
  const kpis = Array.from(document.querySelectorAll('.admin-kpi-card')).map((c) => c.innerText.replace(/\n/g, ' '))
  return { recentOrderRows: rows.length, kpis }
})
console.log('Dashboard KPIs:', stats.kpis)
console.log('Recent order rows shown:', stats.recentOrderRows)
await page.screenshot({ path: 'audit-admin-dashboard.png' })
await browser.close()
