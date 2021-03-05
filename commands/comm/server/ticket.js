module.exports = {
  commands: ['ticket',
    'support'],
  expectedArgs: '<option>',
  minArgs: '1',
  maxArgs: '1',
  callback: async (msg, args) => {

    const authorId = msg.author.id

    if (!msg.channel.name.includes(`ticket-usr`)) return
    
    switch (args[0]) {
      case 'delete':
        msg.channel.delete()
        console.log(`This ${msg.channel.name} deleted from command`)
        break;

      case 'help':
        msg.channel.send('test')
        break;
    }

  }
}