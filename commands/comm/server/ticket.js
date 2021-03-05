const Discord = require('discord.js')
const {prefix} = require('@config/main.json')

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
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Syntax for Ticket support')
        .setDescription(`Commands: \`${prefix}ticket\` or \`${prefix}support\`\nThis channel automatically **deleted** after not **respond** in **1 hour**`)
        .addFields({
          name: 'Delete channel support',
          value: `\`${prefix}ticket delete\``
        }, {
          name: 'Help',
          value: `\`${prefix}ticket help\``
        })
        .setFooter(`Commands: ${prefix}ticket or ${prefix}support`)
        msg.channel.send(helpEmbed)
        break;
    }

  }
}