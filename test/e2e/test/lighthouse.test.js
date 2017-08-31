const puppeteer = require('puppeteer')
const lighthouse = require('lighthouse')
const fs = require('fs')
const configs = require('./configs')

const baseFolder = configs.baseFolder

puppeteer.launch({ args: ['--remote-debugging-port=9222'] }).then(async (browser) => {

  const result = await lighthouse(configs.url)

  // 結果をファイル出力
  saveScore(result)

  browser.close()
})

function saveScore(result) {
  const score = result.reportCategories.reduce((a, b) => Object.assign(a, {
    [b.id]: Math.round(b.score),
  }), {})

  const FMP = result.audits['first-meaningful-paint']
  const FI = result.audits['first-interactive']
  const CI = result.audits['consistently-interactive']
  fs.writeFileSync(`${baseFolder}/lighthouse.json`, JSON.stringify(Object.assign(score, {
    'first-meaningful-paint': {
      score: FMP.score,
      value: FMP.displayValue,
    },
    'first-interactive': {
      score: FI.score,
      value: FI.displayValue,
    },
    'consistently-interactive': {
      score: CI.score,
      value: CI.displayValue,
    },
  }), null, 2))
}