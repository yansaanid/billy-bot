const Base_command = require('@app/Base_command')

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
      this.role(`sedang melakukan hal`).send('admin pong')
    }
  }
}