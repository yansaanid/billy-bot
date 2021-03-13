module.exports = class Base_command {
  constructor() {
    this.msg = {}
  }

  permission = async (permissions, permissionError = 'You do not have permission to run this command.') => {
    let visiblePerm

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
          return false
        }
      }
    }

    for (const permission of permissions) {
      if (this.msg.member.hasPermission(permission))
        visiblePerm = true
    }

    if (permissions.length === 0) visiblePerm = true

    if (!visiblePerm) {
      msg.reply(permissionError)
      return false
    }
  }

  send(result) {
    this.msg.channel.send(result)
  }
}