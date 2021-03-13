module.exports = class Status {
  constructor() {
    //super()
    this.init = {
      //name: "ping",
      desc: "apapun",
      enable: false
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