require('module-alias/register')

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const Discord = require("discord.js")
const client = new Discord.Client()

module.exports = () => {

  const status = {
    status:
    []
  }
  let fileName

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const pathFile = path.join(__dirname, dir, file)
      const stat = fs.lstatSync(pathFile)
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== 'base-command.js' &&
      file !== 'load-command.js' &&
      file !== 'load-feature.js' &&
      file !== 'base-feature.js') {
        fileName = file.replace('.js', '')
        const option = require(pathFile)
        
        if (option.auto) {
          status.status.push({
            name: fileName,
            type: "automation",
            status: (option.enable === false)?false:true
          })
        } else if (option.commands) {
          status.status.push({
            name: option.commands[0],
            type: "command",
            status: (option.enable === false)?false:true
          })
        } else {
          status.status.push({
            name: fileName,
            type: "feature",
            status: (option.enable === false)?false:true
          })
        }

      }
    }
  }

  readCommands('../commands')
  readCommands('../features')

  return status
}