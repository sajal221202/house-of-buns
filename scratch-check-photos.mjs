import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
await page.setViewport({ width: 1400, height: 900 })
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' })

await page.evaluate(() => {
  const el = document.querySelector('#burgers') || document.querySelector('[class*="burger"]')
  el?.scrollIntoView({ block: 'start' })
})
await new Promise(r => setTimeout(r, 500))
await page.screenshot({ path: '/private/tmp/claude-502/-Users-sajal_g/8e169da3-0778-4641-991b-ae04ecd903b3/scratchpad/burgers.png' })

await page.evaluate(() => {
  const el = document.querySelector('#drinks') || [...document.querySelectorAll('section')].find(s => s.textContent.includes('Cold Coffee'))
  el?.scrollIntoView({ block: 'start' })
})
await new Promise(r => setTimeout(r, 500))
await page.screenshot({ path: '/private/tmp/claude-502/-Users-sajal_g/8e169da3-0778-4641-991b-ae04ecd903b3/scratchpad/drinks.png' })

await browser.close()
console.log('done')
