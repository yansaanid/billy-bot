const live = require("@config/live.json")
const {
  botId
} = require("@config/main.json")
const getLive = live.live.map(l => l.channel)

module.exports = {
  auto: true,
  channels: '814083023880454162',
  //userIds: `721964514018590802`,
  callback: async msg => {
    const msgChn = ``
    
    //for (const lives of live.live) {
      //if (msg.channel.id === lives.channel) {
        await msg.channel.messages.fetch().then(m => {
          const msgDel = m.filter(ms => ms.author.id == botId && ms.content == msgChn)
          //msg.channel.bulkDelete(msgDel)
        })

        //msg.channel.send(msgChn)
      //}
    //}
  }
}