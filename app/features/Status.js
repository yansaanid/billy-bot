module.exports = class Status {
  constructor() {
    this.init = {
      name: "status bot",
      desc: "apapun"
    }
  }
  
  run() {
    this.client.user.setPresence({
      activity: {
        name: `${this.prefix}helps`,
        type: 0
      }
    })
  }
}