const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

module.exports = (client) => {
  const baseFile = 'base-command.js'
  const commandBase = require(`./${baseFile}`)

  const commands = []
  let fileName
  
  console.log(chalk`\n---------- {blue LOAD COMMANDS} ----------`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const pathFile = path.join(__dirname, dir, file)
      const stat = fs.lstatSync(pathFile)
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile && file !== 'load-command.js') {
        fileName = file.replace('.js', '')
        const option = require(pathFile)
        commands.push(option)
        if (client) {
          commandBase(client, option, fileName, chalk)
        }
      }
    }
  }

  readCommands('.')

  return commands
}