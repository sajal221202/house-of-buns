import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
await page.setViewport({ width: 1400, height: 900 })
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' })

await page.evaluate(() => {
  const el = [...document.querySelectorAll('h2,h3')].find(s => s.textContent.includes('Featured'))
  el?.scrollIntoView({ block: 'center' })
})
await new Promise(r => setTimeout(r, 1500))
await page.screenshot({ path: '/private/tmp/claude-502/-Users-sajal_g/8e169da3-0778-4641-991b-ae04ecd903b3/scratchpad/burgers.png' })

await page.evaluate(() => {
  const el = [...document.querySelectorAll('h2,h3')].find(s => s.textContent.includes('Meals'))
  el?.scrollIntoView({ block: 'center' })
})
await new Promise(r => setTimeout(r, 1500))
await page.screenshot({ path: '/private/tmp/claude-502/-Users-sajal_g/8e169da3-0778-4641-991b-ae04ecd903b3/scratchpad/meals.png' })

await page.evaluate(() => {
  const el = [...document.querySelectorAll('h2,h3')].find(s => s.textContent.includes('Cold'))
  el?.scrollIntoView({ block: 'center' })
})
await new Promise(r => setTimeout(r, 1500))
await page.screenshot({ path: '/private/tmp/claude-502/-Users-sajal_g/8e169da3-0778-4641-991b-ae04ecd903b3/scratchpad/drinks.png' })

await browser.close()
console.log('done')
