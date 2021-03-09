module.exports = {
  auto: true,
  channels: `814083023880454162`,
  userIds: `240078760173371396`,
  enable: false,
  callback: msg => {
    msg.channel.send(msg.content)
  }
}