const path = require('path')
const fs = require('fs')
const Discord = require("discord.js")
const client = new Discord.Client()

const { token, prefix } = require("./config/main.json")
const dm = require("./functions/dm.js")
const ticket = require('./functions/ticket')
// const mongo = require("./functions/mongo.js")

client.on('ready', async () => {
  console.log(`bot aktif!`)
  const baseFile = 'base-command.js'
  const commandBase = require(`./commands/${baseFile}`)
  
  client.user.setPresence({
    activity: {
      name: ":>help",
      type: 0
    }
  })

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }

  readCommands('commands')
  
  ticket(client)
})

dm(client, "halo bot", reply = "hi juga")

// Token
client.login(token)