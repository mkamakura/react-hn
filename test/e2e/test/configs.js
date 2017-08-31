const format = require('date-fns/format')
const datetime = format(new Date(), 'YYYYMMDD_HHmmss')
const mkdirp = require('mkdirp')
const path = require('path')

const baseFolder = path.resolve(__dirname, datetime)
mkdirp.sync(path.resolve(baseFolder, 'navigation'), (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})

module.exports = {
  datetime: datetime,
  baseFolder: baseFolder,
  url: 'http://localhost:5000',
  size: {
    width: 800,
    height: 640,
  }
}
