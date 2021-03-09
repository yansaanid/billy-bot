require('dotenv/config')
require('module-alias/register')
// const mongo = require("@func/util/mongo.js")

const { prefix } = require("@config/main.json")
const Discord = require("discord.js")
const chalk = require('chalk')
const client = new Discord.Client()

const Server = require('@util/server')
const loadComm = require('@comm/load-command')
const loadFunc = require('@feature/load-feature')

const dm = require("@util/dm")
const loadDm = require("@data/dm.json")

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