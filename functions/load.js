const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

module.exports = (client) => {
  const baseFile = 'base-functions.js'
  const featureBase = require(`./${baseFile}`)
  
  const functions = []
  let fileName

console.log(chalk`\n---------- {blue LOAD FUNCTIONS} ----------`)

  const readFeatures = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const pathFile = path.join(__dirname, dir, file)
      const stat = fs.lstatSync(pathFile)
      if (stat.isDirectory()) {
        if (file !== 'util' && file !== 'data')
          readFeatures(path.join(dir, file))
      } else if (file !== 'load.js' && file !== `base-functions.js`) {
        fileName = file.replace('.js', '')
        const option = require(pathFile)
        functions.push(option)
        if (client) {
          featureBase(client, option, fileName, chalk)
        }
      }
    }
  }

  readFeatures('.')
  return functions
}