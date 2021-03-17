const Base_command = require('@app/Base_command')

module.exports = class Ping extends Base_command {
  constructor() {
    super()
    this.init = {
      name: "ping",
      desc: "apapun",
      command: ["ping"]
    }
    // simple title: :>ping -n <your name>
    // example: :>ping -n Billy
    this.help = [
      {
        name: 'simple title',
        identify: 'name',
        expected: {
          your_name: 'Billy'
        }
      }
    ]
    
  }

  run(args) {
    this.event('name', args).send('Hi, #name')
    
    
    if (args.length === 0)
      this.send("pong")
  }
}