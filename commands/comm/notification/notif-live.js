const live = require("@config/live.json")
const getLive = live.live.map(l => l.channel)

module.exports = {
  auto: true,
  channels: getLive,
  userIds: `721964514018590802`,
  callback: msg => {
    for (const lives of live.live) {
      if (msg.channel.id === lives.channel) {
        msg.channel.send(`Notifikasi ini ditujukan untuk role <@&${lives.role}>, anda bisa mendapatkan update terbaru dari channel ini di <#${live.notifChn}>`)
      }
    }
  }
}