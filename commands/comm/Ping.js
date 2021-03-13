module.exports = class Ping {
  constructor() {
    this.init = {
      //name: "ping",
      desc: "apapun",
      command: ["ping"]
    }
  }
  
  run(msg, args) {
    console.log(args)
    //this.send(msg, "nama")
  }
}