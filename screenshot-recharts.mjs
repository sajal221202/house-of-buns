import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle0' })
await page.type('input[type="password"]', '2026')
await page.click('button[type="submit"]')
await new Promise((r) => setTimeout(r, 1000))
await page.screenshot({ path: '/tmp/recharts-dashboard.png', fullPage: true })

// hover over the trend chart to trigger tooltip
const trendBox = await page.$('.recharts-wrapper')
if (trendBox) {
  const box = await trendBox.boundingBox()
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await new Promise((r) => setTimeout(r, 300))
  await page.screenshot({ path: '/tmp/recharts-tooltip.png' })
}

console.log('ERRORS:', JSON.stringify(errors))
await browser.close()
