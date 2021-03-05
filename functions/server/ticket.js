const firstMsg = require('@func/util/first-msg')
const Discord = require('discord.js')
const {
  botId,
  ticketKatId: categoryId,
  ticketChnId: chnId,
  serverId,
  adminId,
  prefix,
  maxSupport
} = require('@config/main.json')
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async client => {
const allowView = [...adminId, botId]
  const category = client.channels.cache.find(c => c.id == categoryId)

  let countChnLive = async chn => {
    const countChn = await chn.cache.filter(c => c.name.includes('ticket-usr')).size
    const react = ['🎟']
    const ticketEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Ticket Support')
    .setDescription(`Silahkan klik 🎟 untuk masuk channel support\n\n **Stok support __${countChn}/${maxSupport}__**`)

    firstMsg(client, chnId, ticketEmbed, react)
  }

  countChnLive(client.channels)
  client.on('channelCreate', c => countChnLive(c.guild.channels))
  client.on('channelDelete', c => countChnLive(c.guild.channels))

  const welcomeTicketEmbed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Ticket Support')
  .setDescription(`Selamat datang di channel support kami. Silahkan betanya masalah server ini disini. Channel ini akan dihapus jika tidak merespon sekitar 1 jam atau anda dapat menghapusnya dengan ketik \`${prefix}ticket delete\`.\n\nKetik \`${prefix}ticket help\` untuk info lebih lanjut.`)

  client.on('messageReactionAdd', async (r, u) => {
    const supportchn = client.channels.cache.find(c => c.name == `ticket-usr${u.id}`)
    const Channels = await client.channels.cache.filter(c => c.name.includes('ticket-usr'))

    if (r.message.channel.id === chnId) {
      if (u.id === botId) return

      if (!supportchn) {
        const {
          guild
        } = r.message.channel

        if (Channels.size === maxSupport) {
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

            tc.updateOverwrite(serverId, {
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
    const Channels = await client.channels.cache.filter(c => c.name.includes('ticket-usr'))

    if (!Channels) return

    Channels.forEach(async Channel => {
      const lastTime = await Channel.messages.fetch({
        limit: 1
      }).then(async mes => await mes.last().createdTimestamp)
      let now = Date.now()

      if ((lastTime + (60*60*1000)) < now) {
        console.log(`This ${Channel.name} deleted after 1 hour no respond`)
        Channel.delete()
        await sleep(8*1000)
      }

    })

  },
    2000)
}