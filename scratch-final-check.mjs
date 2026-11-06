import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
await page.setViewport({ width: 420, height: 900 })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' })

async function scrollToAndShot(selector, name) {
  const target = await page.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const rect = el.getBoundingClientRect()
    return rect.top + window.scrollY
  }, selector)
  if (target == null) {
    console.log(`${name}: selector not found`)
    return
  }
  await page.evaluate((y) => window.scrollTo(0, y - 10), target)
  await new Promise((r) => setTimeout(r, 400))
  await page.screenshot({ path: name })
}

await scrollToAndShot('#menu', 'scratch-check-burgers.png')
await scrollToAndShot('.sides:not(.combos)', 'scratch-check-sides.png')
await scrollToAndShot('.drinks', 'scratch-check-drinks.png')

await browser.close()
