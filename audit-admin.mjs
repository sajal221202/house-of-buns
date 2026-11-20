import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
const errors = []
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

await page.goto('https://admin.houseofbuns.co.in/', { waitUntil: 'networkidle0', timeout: 30000 })
const pinScreen = await page.evaluate(() => Boolean(document.querySelector('.admin-pin-screen')))
console.log('Admin PIN screen loads:', pinScreen)

// Try the documented default PIN
await page.evaluate(() => {
  const input = document.querySelector('.admin-pin-card input')
  const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  s.call(input, '2026')
  input.dispatchEvent(new Event('input', { bubbles: true }))
  document.querySelector('.admin-pin-card').requestSubmit()
})
await new Promise((r) => setTimeout(r, 800))
const unlocked = await page.evaluate(() => Boolean(document.querySelector('.admin-shell')))
console.log('PIN 2026 unlocks portal:', unlocked)

if (unlocked) {
  // Check dashboard for any orders at all
  const activeCount = await page.evaluate(() => document.querySelector('.admin-nav-badge')?.textContent || '0 (no badge)')
  console.log('Live Orders badge count:', activeCount)

  // Go to Franchise Leads tab
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.admin-nav-item'))
    items.find((b) => b.textContent.includes('Franchise'))?.click()
  })
  await new Promise((r) => setTimeout(r, 800))
  const franchiseError = await page.evaluate(() => document.body.innerText.includes('Could not find the table'))
  const franchiseEmpty = await page.evaluate(() => document.querySelector('.admin-empty')?.textContent || null)
  console.log('Franchise table missing error shown:', franchiseError, '| empty state text:', franchiseEmpty)
}

console.log('Console errors:', errors.length ? errors : 'none')
await page.screenshot({ path: 'audit-admin-result.png' })
await browser.close()
