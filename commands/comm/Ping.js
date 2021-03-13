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
  
  run(args) {
    if (args.length === 0)
      this.send("pong")
    else {
      if (this.permission(['ADMINISTRATOR']))
        this.send('admin pong')
    }
  }
}