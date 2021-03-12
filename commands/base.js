require('./Main.json')

module.exports = {
  class Base_command extends Main {
    constructor(client, name, desc, command = []) {
      this.name = name
      this.desc = desc
      this.command = command

      console.log(this.client)
    }
  }
}