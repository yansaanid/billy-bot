const live = require("@config/live.json")
const {
  botId
} = require("@config/main.json")
const getLive = live.live.map(l => l.channel)

module.exports = {
  auto: true,
  channels: getLive,
  userIds: `721964514018590802`,
  callback: async msg => {
    for (const lives of live.live) {
      if (msg.channel.id === lives.channel) {
        await msg.channel.messages.fetch().then(m => {
          const msgDel = m.filter(ms => ms.author.id == botId)
          msg.channel.bulkDelete(msgDel)
        })

        msg.channel.send(`Notifikasi ini ditujukan untuk role <@&${lives.role}>, anda bisa mendapatkan update terbaru dari channel ini di <#${live.notifChn}>`)
      }
    }
  }
}