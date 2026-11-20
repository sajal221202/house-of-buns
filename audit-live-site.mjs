import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage()
const errors = []
const failedRequests = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push('PAGEERROR: ' + String(err)))
page.on('requestfailed', (req) => failedRequests.push(`${req.url()} :: ${req.failure()?.errorText}`))
page.on('response', (res) => {
  if (res.status() >= 400) failedRequests.push(`${res.status()} ${res.url()}`)
})

await page.setViewport({ width: 420, height: 900 })
await page.goto('https://houseofbuns.co.in/', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1000))

console.log('--- HOMEPAGE LOAD ---')
console.log('Console/page errors:', errors.length ? errors : 'none')
console.log('Failed/4xx+ requests:', failedRequests.length ? failedRequests : 'none')

// Check all images actually loaded (naturalWidth > 0)
const brokenImages = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('img'))
    .filter((img) => img.complete && img.naturalWidth === 0)
    .map((img) => img.src)
})
console.log('Broken <img> (0 width):', brokenImages.length ? brokenImages : 'none')

// Service worker + manifest
const swManifest = await page.evaluate(async () => {
  const reg = await navigator.serviceWorker.getRegistration()
  const manifestRes = await fetch('/manifest.webmanifest').then((r) => r.status).catch((e) => String(e))
  return { sw: reg ? reg.active?.state : 'no-registration', manifestStatus: manifestRes }
})
console.log('Service worker:', swManifest.sw, '| manifest status:', swManifest.manifestStatus)

await browser.close()
