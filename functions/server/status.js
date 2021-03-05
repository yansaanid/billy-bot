const {prefix} = require('@config/main.json')

module.exports = client => {
  client.user.setPresence({
    activity: {
      name: `${prefix}help`,
      type: 0
    }
  })
}