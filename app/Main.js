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
    this.#read('commands')
    this.#read('features')
  }

  #checkInit(f, init, file) {
    if (typeof init !== "object")
      throw new Error("init object not exist")

    if (!init.name)
      init.name = file.replace('.js', '').toLowerCase()

    if (!init.enable && init.enable !== false)
      init.enable = true

    if (f.msg) {
      if (!init.minArgs)
        init.minArgs = 0

      if (!init.maxArgs)
        init.maxArgs = null
    }
  }

  #sendMessages(f) {
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

            if (args.length < f.init.minArgs || (f.init.maxArgs !== null && args.length > f.init.maxArgs)) {
              message.reply(`Incorrect syntax! Use ***${prefix}${alias} ${expectedArgs}***`)
              return
            }

            return f.run(args)
          }
        }
      } else {
        if (msg.author.id === botId)
          return f.run()
      }

      //feature.help(message)
    })
  }

  #checkConsole(o,
    i) {
    let nameConsole

    if (o.msg) {
      if (i.command) {
        nameConsole = chalk.bgBlue.black.bold(i.name)
      } else {
        nameConsole = chalk.bgMagenta.black.bold(i.name)
      }
    } else {
      nameConsole = chalk.cyan.bgBlack.bold(i.name)
    }

    const checkEnabled = (i.enable)?chalk.green.bold(`ENABLED ✅`): chalk.red.bold(`DISABLE ❌`)

    console.log(`${nameConsole} is ${checkEnabled}`)
  }

  #read(dir) {
    console.log(chalk`\n---------- {blue LOAD ${dir.toUpperCase()}} ----------`)
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        this.#read(path.join(dir, file))
      } else if (file !== 'base.js') {
        const Feature = require(path.join(__dirname, dir, file))
        Feature.prototype.prefix = this.prefix
        Feature.prototype.client = this.client

        const feature = new Feature()
        this.#runFunction(feature, file)
      }
    }
  }

  #runFunction(f, fl) {
    this.#checkInit(f, f.init, fl)
    if (f.msg) {
      this.#sendMessages(f)
    } else {
      if (f.init.enable)
        f.run()
    }
    this.#checkConsole(f, f.init)
  }
}