const fs = require('fs')
const path = require('path')

module.exports = class Main {
  constructor(prefix, client) {
    this.prefix = prefix
    this.client = client
  }

  run() {
    const readFeatures = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readFeatures(path.join(dir, file))
        } else if (file !== 'base.js') {
          const Feature = require(path.join(__dirname, dir, file))
          Feature.prototype.prefix = this.prefix
          Feature.prototype.client = this.client
          let args

          console.log(`Enabling feature "${file}"`)
          const feature = new Feature()
          if (typeof feature.init !== "object")
            throw new Error("init object not exist")

          if (!feature.init.name)
            feature.init.name = file.replace('.js', '').toLowerCase()

          if (!feature.init.enable)
            feature.init.enable = true

          console.log(feature.init)
          this.client.on('message', msg => {
            if (feature.init.commands) {
              for (const alias of feature.init.commands) {
                const command = `${feature.prefix}${alias.toLowerCase()}`

                if (
                  msg.content.toLowerCase().startsWith(`${command} `) ||
                  content.toLowerCase() === command) {
                   feature.run(msg, msg.content.match(/"[^"]+"|[^\s]+/g).map(e => e.replace(/"(.+)"/, "$1")))
                }
              }
            } else {
              feature.run(msg, args)
            }

            //feature.help(message)
          })
        }
      }
    }

    readFeatures('../commands/comm')

  }
}