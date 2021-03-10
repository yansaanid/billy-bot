const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const Discord = require("discord.js")
const client = new Discord.Client()

module.exports = (client) => {
  const baseFile = 'base-feature.js'
  const featureBase = require(`./${baseFile}`)
  
  const functions = []
  let fileName

console.log(chalk`\n---------- {blue LOAD FEATURES} ----------`)

  const readFeatures = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const pathFile = path.join(__dirname, dir, file)
      const stat = fs.lstatSync(pathFile)
      if (stat.isDirectory()) {
          readFeatures(path.join(dir, file))
      } else if (file !== 'load-feature.js' && file !== baseFile) {
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