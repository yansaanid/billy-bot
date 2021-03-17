const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = class Main {
  constructor(prefix, client, botId) {
    this.prefix = prefix
    this.client = client
    this.botId = botId
    this.data = []
  }

  run() {
    this.#read('commands')
    this.#read('features')
    console.log(this.getData())
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

      init.type = (init.command)?"command": "automation"
    } else {
      init.type = "feature"
    }
  }

  #help() {
    this.client.on('message', m => {
      if (m.content.toLowerCase() === `${this.prefix}help`) {
        m.channel.send()
      }
    })
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
              message.reply(`Incorrect syntax! Use ***${prefix}${alias} -h*** for info`)
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

  #setHelp(f) {
    if (f.help) {
      let helps,
      i = 0
      if (!Array.isArray(f.help))
        helps = [f.help]
      else
        helps = f.help

      for (const h of helps) {
        if (!h.name || h.name === '')
          throw new Error(`Hidden required value in ${f.init.name}, this.help.name in index array ${i}`)

        if (typeof h.name !== 'string')
          throw new Error('Value this.help.name is string')

        if (!h.identify || h.identify === '')
          throw new Error(`Hidden required value in ${f.init.name}, this.help.identify in index array ${i}`)

        if (typeof h.identify !== 'string')
          throw new Error('Value this.help.identify is string')

        if (!h.expected || h.expected === {})
        throw new Error(`Hidden required value in ${f.init.name}, this.help.expected in index array ${i}`)

        if (typeof h.expected !== 'object')
          throw new Error('Value this.help.expected is object')

        i += 1
      }
    }
  }

  getData() {
    return this.data
  }

  #runFunction(f, fl) {
    this.#checkInit(f, f.init, fl)
    this.#setHelp(f)
    this.data.push(f.init)
    if (f.msg) {
      this.#sendMessages(f)
    } else {
      if (f.init.enable)
        f.run()
    }
    this.#checkConsole(f, f.init)
  }
}