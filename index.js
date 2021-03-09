require('dotenv/config')
require('module-alias/register')
// const mongo = require("@func/util/mongo.js")

const { prefix } = require("@config/main.json")
const Discord = require("discord.js")
const chalk = require('chalk')
const client = new Discord.Client()

const Server = require('@func/util/server')
const loadComm = require('@root/commands/load')
const loadFunc = require('@func/load')

const dm = require("@func/util/dm")
const loadDm = require("@func/data/dm.json")

client.on('ready', async () => {
  //console.log(client)
  console.log(chalk`${chalk.bgYellow.black.bold(client.user.username)} is {bgGreen.white.bold Active}`)
  
  loadComm(client)
  loadFunc(client)
})

loadDm.forEach(DM => dm(client, DM.send, DM.reply))

// Token
Server()
client.login(process.env.TOKEN)