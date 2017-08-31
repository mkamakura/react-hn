const puppeteer = require('puppeteer')
const GIFEncoder = require('gifencoder')
const pngFileStream = require('png-file-stream')
const fs = require('fs')
const configs = require('./configs')

const baseFolder = configs.baseFolder
const navBaseFolder = baseFolder + '/navigation'

puppeteer.launch().then(async (browser) => {
  const page = await browser.newPage()
  page.setViewport({ width: configs.size.width, height: configs.size.height })

  await page.goto(configs.url)
  await page.waitForSelector('.Item__title')
  await page.screenshot({ path: `${navBaseFolder}/top.png` })

  // goto comment
  await page.click('#app > div > div > div.App__header > a:nth-child(4)')
  await page.waitForSelector('.Comments')
  await page.screenshot({ path: `${navBaseFolder}/comment.png` })

  browser.close()

  // generate gif
  const encoder = new GIFEncoder(configs.size.width, configs.size.height)
  pngFileStream(`${navBaseFolder}/**/*.png`)
    .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
    .pipe(fs.createWriteStream(`${baseFolder}/navigation.gif`))

})
