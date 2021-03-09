const {
  prefix
} = require('@config/main.json')

module.exports = {
  callback: client => {
    client.user.setPresence({
      activity: {
        name: `${prefix}help`,
        type: 0
      }
    })
  }
}