const Base_command = require('@comm/base')

module.exports = class Ping extends Base_command {
  constructor() {
    super()
    this.init = {
      //name: "ping",
      desc: "apapun",
      command: ["ping"]
    }
  }
  
  run() {
    this.send("pong")
  }
}