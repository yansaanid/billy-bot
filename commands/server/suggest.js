const Discord = require('discord.js')
const {
  prefix
} = require("../../config/main.json")


module.exports = {
  commands: ['suggest',
    'saran'],
  expectedArgs: '<saran> <option> <isi saran>',
  minArgs: '1',
  channels: ['813190986226335773',
    '815132854987128842',
    '814083023880454162'],
  callback: async (msg, args, text) => {
    let titleSuggest = `Suggestion from *${msg.author.username}*`

    switch (args[0]) {
      case '-t':
        titleSuggest = args[1]
        args.shift()
        args.shift()
        break;
      case '-h':
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Syntax for Suggestion')
        .setDescription(`Commands: \`${prefix}suggest\` or \`${prefix}saran\``)
        .addFields({
          name: 'Simple suggestion',
          value: `\`${prefix}suggest <suggestion> \`\n\nExample: \`${prefix}suggest adding emoji in server!\``
        }, {
          name: 'Add custom title',
          value: `\`${prefix}suggest -t <title using (")> <suggestion> \`\n\nExample: \`suggest -t "Add channel game" Add channel game for this server!\``
        }, {
          name: 'Deleting suggestion',
          value: `\`${prefix}suggest -d <messageID>\`\n\nExample: \`${prefix}suggest -d 816084333542113311\``
        }, {
          name: 'Help (send to DM)',
          value: `\`${prefix}suggest -h\``
        })
        msg.author.send(helpEmbed)
        msg.delete()
        return
        break;
      case '-d':
        msg.delete()
        if (args.length < 2) {
          msg.reply(`Incorrect syntax! Use ***${prefix}suggest -d <messageID>***`)
          return
        }

        if (args.length > 2) {
          msg.reply(`You can only delete 1 suggestion`)
          return
        }

        await msg.channel.messages.fetch(args[1]).then(
          m => {
            if (m.channel.id !== msg.channel.id) {
              msg.reply('You can only delete suggestions on this channel')
              return
            }

            if (m.content.includes(msg.author.id)) {
              msg.reply(`You can only delete your own suggestions!`)
              return
            }

            m.delete()
          })
        return
        break;
    }

    console.log(args)
    const suggestEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(titleSuggest)
    .setDescription(args.join(' '))
    .setTimestamp()
    .setFooter(`Dari ${msg.author.username}`);
    msg.delete({
      timeout: 4000
  })

  setTimeout(async () => {
    if (!msg.deleted) {
      await msg.channel.send(`Suggestion from *<@${msg.author.id}>*`,
        suggestEmbed).then(m => {
          m.react("👍")
          m.react("👎")
        })
      }
    },
    3000)
  }
}