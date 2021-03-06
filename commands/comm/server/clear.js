module.exports = {
  commands: ['clear'],
  permissions: ['ADMINISTRATOR', 'MANAGE_CHANNELS'],
  callback: async (msg, args, text, cl)  => {
    await msg.channel.messages.fetch().then(m => {
      msg.channel.bulkDelete(m)
    })
  }
}