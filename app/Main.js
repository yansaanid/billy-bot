const fs = require('fs')
const path = require('path')

module.exports = class Main {
  constructor(prefix, client) {
    this.prefix = prefix
    this.client = client
  }

  run() {
    const readFeatures = (dir, message) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readFeatures(path.join(dir, file))
        } else if (file !== 'base.js') {
          const Feature = require(path.join(__dirname, dir, file))
          Feature.prototype.prefix = this.prefix
          Feature.prototype.client = this.client

          console.log(`Enabling feature "${file}"`)
          const feature = new Feature()
          if (typeof feature.init !== "object")
            throw new Error("init object not exist")

          if (!feature.init.name)
            feature.init.name = file.replace('.js', '').toLowerCase()

          if (!feature.init.enable)
            feature.init.enable = true

          console.log(feature.init)
          //if (message) {
          //feature.run(message)
          //feature.help(message)
          //}
        }
      }
    }

    //this.client.on('message', (message) => {
    readFeatures('../commands/comm')
    //})

  }
}