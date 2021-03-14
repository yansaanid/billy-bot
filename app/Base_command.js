module.exports = class Base_command {
  constructor() {
    this.msg = {}
  }

  permission(permissions, permissionError = 'You do not have permission to run this command.', enable = true) {
    if (this.nosend) return this

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


  role(roles, msg = `You must have role $thisRole to use this command.`, enable = true) {
    if (this.nosend) return this

    let visibleRole = false
    const requiredRoles = this.#checkArray(roles)
    let thisRole = ""
    let totalRole = requiredRoles.length

    for (const requiredRole of requiredRoles) {
      let myRole
      if (isNaN(requiredRole))
        myRole = requiredRole
      else
        myRole = this.msg.guild.roles.cache.filter(r => r.id === requiredRole).name

      if (totalRole > 1)
        thisRole += (!--totalRole)?`and ***${myRole}***`: `***${myRole}***, `
      else
        thisRole = `***${myRole}***`

      const role = this.msg.guild.roles.cache.find(
        (role) => role.name.toLowerCase === requiredRole || role.id === requiredRole)

      if (role)
        visibleRole = true
    }

    if (requiredRoles.length === 0) visibleRole = true

    if (msg.includes('$thisRole')) {
      const cutMsg = msg.split(`$thisRole`)
      msg = cutMsg[0] + thisRole + cutMsg[1]
    }

    if (!visibleRole) {
      if (enable === true)
        this.msg.reply(msg)
      this.nosend = true
    }
    return this
  }

  channel(channel, msg = `Only in channel $thisChn to use this command`, enable = false) {
    if (this.nosend) return this

    let visibleChn = false
    const channels = this.#checkArray(channel)
    let thisChn = ''
    const countChannel = channels.length

    for (const channelId of channels) {
      let myChn = `<#${this.msg.guild.channels.cache.filter(r => r.id === channelId).name}>`

      if (countChannel > 1)
        thisChn += (!--countChannel)?`and ***${myChn}***`: `***${myChn}***, `
      else
        thisChn = `***${myChn}***`

      if (message.channel.id === channelId)
        visibleChn = true
    }

    if (channels.length === 0)
      visibleChn = true

    if (msg.includes('$thisChn')) {
      const cutMsg = msg.split(`$thisChn`)
      msg = cutMsg[0] + thisChn + cutMsg[1]
    }

    if (!visibleChn) {
      if (enable)
        this.msg.reply(msg)
      this.nosend = true
    }
    return this
  }

  user(user, msg = `Only $thisUser to use this command`, enable = false) {
    if (this.nosend) return this

    let visibleUser = false
    const userIds = this.checkArray(user)
    let thisUser = ''
    const countUser = userIds.length

    for (const userId of userIds) {
      let myUser = `<@${this.msg.guild.members.cache.filter(r => r.id === userId).name}>`

      if (countUser > 1)
        thisUser += (!--countUser)?`and ***${myUser}***`: `***${myRole}***, `
      else
        thisUser = `***${myUser}***`

      if (message.author.id === userId)
        visibleUser = true
    }

    if (userIds.length === 0)
      visibleUser = true

    if (msg.includes('$thisUser')) {
      const cutMsg = msg.split(`$thisUser`)
      msg = cutMsg[0] + thisUser + cutMsg[1]
    }

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