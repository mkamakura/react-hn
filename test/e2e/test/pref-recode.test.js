const puppeteer = require('puppeteer')
const configs = require('./configs')

const baseFolder = configs.baseFolder

puppeteer.launch().then(async (browser) => {
  const page = await browser.newPage()

  await page.tracing.start({ path: `${baseFolder}/trace.json` })
  await page.goto(configs.url)
  await page.tracing.stop()

  browser.close()

})
