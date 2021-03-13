const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = class Main {
  constructor(prefix, client, botId) {
    this.prefix = prefix
    this.client = client
    this.botId = botId
  }

  run() {
    this.readFeatures('../commands/comm', 'commands')
  }

  checkInit(init, file) {
    if (typeof init !== "object")
      throw new Error("init object not exist")

    if (!init.name)
      init.name = file.replace('.js', '').toLowerCase()

    if (!init.enable)
      init.enable = true
  }

  sendMessages(f) {
    let args

    if (!f.init.enable) return
    this.client.on('message', msg => {
      f.msg = msg
      if (f.init.command) {
        for (const alias of f.init.command) {
          const command = `${this.prefix}${alias.toLowerCase()}`

          if (
            msg.content.toLowerCase().startsWith(`${command} `) ||
            msg.content.toLowerCase() === command) {
            args = msg.content.match(/"[^"]+"|[^\s]+/g).map(e => e.replace(/"(.+)"/, "$1"))

            args.shift()
            return f.run(args)
          }
        }
      } else {
        return f.run()
      }

      //feature.help(message)
    })
  }

  checkConsole(i) {
    const checkEnabled = (i.enable)?chalk.green.bold(`ENABLED ✅`): chalk.red.bold(`DISABLE ❌`)

    console.log(`${i.name} is ${checkEnabled}`)
  }

  readFeatures(dir,
    name) {
    console.log(chalk`\n---------- {blue LOAD ${name.toUpperCase()}} ----------`)
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readFeatures(path.join(dir, file))
      } else if (file !== 'base.js') {
        const Feature = require(path.join(__dirname, dir, file))
        Feature.prototype.prefix = this.prefix
        Feature.prototype.client = this.client
        Feature.prototype.msg = {}

        const feature = new Feature()
        this.runFeature(feature, file, name)
      }
    }
  }

  runFeature(f, fl, name) {
    this.checkInit(f.init, fl)
    this.sendMessages(f)
    this.checkConsole(f.init)
  }
}