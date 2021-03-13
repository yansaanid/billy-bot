module.exports = class Base_command {
  constructor() {
    this.msg = {}

  }

  permission(permissions, permissionError = 'You do not have permission to run this command.', enable = true) {
    let visiblePerm = false
    const perm = this.#checkArray(permissions, "permission")
    this.#validatePermissions(perm)

    for (const permission of perm) {
      if (this.msg.member.hasPermission(permission))
        visiblePerm = true
    }

    if (perm.length === 0) visiblePerm = true

    if (!visiblePerm) {
      if (enable)
        this.msg.reply(permissionError)
      this.nosend = true
    }
    return this
  }


  role(roles, msg = `You must have role "${thisRole}" to use this command.`, enable = true) {
    let visibleRole = false
    const requiredRoles = this.#checkArray(roles)
    let thisRole = ""
    let totalRole = requiredRoles.length

    for (const requiredRole of requiredRoles) {
      let myRole
      if (isNaN(requiredRole))
        myRole = requiredRole
      else
        myRole = guild.roles.cache.filter(r => r.id === requiredRole).name

      if (totalRole > 1)
        thisRole += (!--totalRole)?`and ***${myRole}***`: `***${myRole}***, `
      else
        thisRole = `***${myRole}***`

      const role = guild.roles.cache.find(
        (role) => role.name === requiredRole || role.id === requiredRole)

      if (role)
        visibleRole = true
    }

    if (requiredRoles.length === 0) visibleRole = true

    if (!visibleRole) {
      if (enable === true)
        this.msg.reply(msg)
      this.nosend = true
    }
    return this
  }

  channel(channel) {
    let visibleChn = false
    const channels = this.#checkArray(channel)

    for (const channelId of channels) {
      if (message.channel.id === channelId)
        visibleChn = true
    }

    if (channels.length === 0)
      visibleChn = true

    if (!visibleChn) this.nosend = true
    return this
  }

  user(user, msg = `Only ${thisUser} to use this command`, enable = false) {
    let visibleUser = false
    const userIds = this.checkArray(user)
    let thisUser = ''
    const countChannel = userIds.length

    for (const userId of userIds) {
      let myUser = `<@${guild.members.cache.filter(r => r.id === userId).name}>`
      
      if (countChannel > 1)
        thisUser += (!--countChannel)?`and ***${myUser}***`: `***${myRole}***, `
      else
        thisUser = `***${myUser}***`
      
      if (message.author.id === userId)
        visibleUser = true
    }

    if (userIds.length === 0)
      visibleUser = true

    if (!visibleUser) {
      if (enable)
        this.msg.reply(msg)
      this.nosend = true
    }
    return this
  }

  send(result) {
    if (!this.nosend)
      this.msg.channel.send(result)
  }

  #validatePermissions(permissions) {
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

  #checkArray(a, n) {
    if (typeof a === 'string')
      return [a]
    else {
      if (Array.isArray(a))
        return a
      else
        throw new Error(`${n} only contain string or array`)
    }
  }

}