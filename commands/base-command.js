/**
* NOTE:
*  Some parts of this code have been improved since the original command base video.
*  This file should still work as expected, however if you are learning the inner workings of
*  this file then expect the file to be slightly different than in the video.
*/

const {
  prefix,
  botId
} = require('@config/main.json')

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}

module.exports = (client, commandOptions, fileName, chalk) => {
  let {
    commands,
    auto = false,
    expectedArgs = '',
    permissionError = 'You do not have permission to run this command.',
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    channels = [],
    userIds = [],
    bot = 0,
    enable = true,
    callback,
  } = commandOptions

  // Ensure the command and aliases are in an array

  if (!auto) {
    if (typeof commands === 'string')
      commands = [commands]

    nameCommand = chalk.bgBlue.black.bold(commands[0])
  } else {
    nameCommand = chalk.bgMagenta.black.bold(fileName)
  }

  const checkEnabled = (enable)?chalk.green.bold(`ENABLED ✅`): chalk.red.bold(`DISABLE ❌`)

  console.log(`${nameCommand} is ${checkEnabled}`)

  if (!enable) return

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === 'string')
      permissions = [permissions]

    validatePermissions(permissions)
  }

  if (typeof channels === 'string')
    channels = [channels]

  if (typeof userIds === 'string')
    userIds = [userIds]

  // Listen for messages
  client.on('message', (message) => {
    if (message.author.id === botId) return

    const {
      member,
      content,
      guild
    } = message
    let visibleChn = false
    let visibleRole = false
    let visiblePerm = false

    for (const channelId of channels) {
      if (message.channel.id === channelId)
        visibleChn = true
    }

    if (channels.length === 0)
      visibleChn = true

    if (!visibleChn) return

    if (auto) {
      if (channels.length === 0) return
      if (message.content.includes(prefix)) return

      let visibleUser = false

      for (const userId of userIds) {
        if (message.author.id === userId)
          visibleUser = true
      }

      if (userIds.length === 0)
        visibleUser = true

      if (!visibleUser) return

      if (bot === 1) {
        if (!message.author.bot)
          return
      }

      if (bot === -1) {
        if (message.author.bot)
          return
      }

      for (const permission of permissions) {
        if (member.hasPermission(permission))
          visiblePerm = true
      }

      if (permissions.length === 0)
        visiblePerm = true

      if (!visiblePerm) return

      for (const requiredRole of requiredRoles) {
        const role = guild.roles.cache.find(
          (role) => role.name === requiredRole
        )

        if (role || member.roles.cache.has(role.id))
          visibleRole = true
      }

      if (requiredRoles.length === 0)
        visibleRole = true

      if (!visibleRole) return

      callback(message, client)
      return
    }

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command && !auto
      ) {
        // A command has been ran

        // Ensure the user has the required permissions
        for (const permission of permissions) {
          if (member.hasPermission(permission))
            visiblePerm = true
        }

        if (permissions.length === 0) visiblePerm = true

        if (!visiblePerm) {
          message.reply(permissionError)
          return
        }

        // Ensure the user has the required roles
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id))
            visibleRole = true
        }

        if (requiredRoles.length === 0) visibleRole = true

        if (!visibleRole) {
          message.reply(
            `You must have the ***"${requiredRole}"*** role to use this command.`
          )
          return
        }

        // Split on any number of spaces
        const arguments = content.match(/"[^"]+"|[^\s]+/g).map(e => e.replace(/"(.+)"/, "$1"))//.split(/[ ]+/)

        // Remove the command which is the first index
        arguments.shift()

        // Ensure we have the correct number of arguments
        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          message.reply(
            `Incorrect syntax! Use ***${prefix}${alias} ${expectedArgs}***`
          )
          return
        }

        // Handle the custom command code
        callback(message, arguments, arguments.join(' '), client)

        return
      }
    }
  })
}