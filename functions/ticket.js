const firstMsg = require('./first-msg')
const Discord = require('discord.js')
const {
  botId,
  ticketKatId: categoryId,
  ticketChnId: chnId,
  serverId,
  adminId,
  prefix,
  maxSupport
} = require('../config/main.json')
const allowView = [...adminId, botId]

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = client => {
  const category = client.channels.cache.find(c => c.id == categoryId && c.type == "category")

  const ticketEmbed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Ticket Support')
  .setDescription('click ticket for get secret support message')

  const welcomeTicketEmbed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Ticket Support')
  .setDescription('Welcome to ticket support')

  const react = ['🎟']

  firstMsg(client, chnId, ticketEmbed, react)

  client.on('messageReactionAdd', async (r, u) => {
    const supportchn = client.channels.cache.find(c => c.name == `ticket-usr${u.id}` && c.type == "text")

    if (r.message.channel.id === chnId) {
      if (u.id === botId) return

      if (!supportchn) {
        const {
          guild
        } = r.message.channel

        const supChn = await guild.channels.cache.find(c => c.name.includes('ticket-usr'))

        let countChn

        if (!supChn) countChn = 0
        else countChn = supChn.size

        if (countChn === maxSupport) {
          u.send('support telah mencapai batas maxsimum')
          r.users.remove(u.id)
          return
        }

        await guild.channels.create(`ticket-usr${u.id}`,
          {
            type: 'text'
          }).then(async tc => {
            tc.setParent(categoryId)
            tc.setTopic(`This is private support ticket from ${u.username}`)
            ticketChnId = tc.id

            for (const allow of allowView) {
              tc.updateOverwrite(allow, {
                VIEW_CHANNEL: true
              })
            }

            tc.updateOverwrite(guild.id, {
              VIEW_CHANNEL: false
            })

            await tc.send(welcomeTicketEmbed)

            tc.updateOverwrite(u.id,
              {
                VIEW_CHANNEL: true
              })

          })
      }

      r.users.remove(u.id)
    }

  })

  setInterval(async () => {
    const Guild = client.guilds.cache.find(guild => guild.id = serverId)

    try {
      const Channels = await Guild.channels.cache.find(c => c.name.includes('ticket-usr'))

      if (!Channels) return

      for (const Channel of Channels) {
        const lastTime = await Channel.messages.fetch({
          limit: 1
        }).then(async mes => await mes.first().createdTimestamp)
        const now = Date.now()

        try {
          if (!(lastTime + (60*60*1000)) < now) return

          console.log(`This ${Channel.name} deleted after 1 hour no respond`)
          Channel.delete()
          await sleep(8*1000)
        } catch (e) {}
      }

    } catch (e) {
      await sleep(8*1000)
    }
  },
    2000)
}