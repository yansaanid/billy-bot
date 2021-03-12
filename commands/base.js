module.exports = {
  class Base_command {
    constructor(name, desc, command = []) {
      this.name = name
      this.desc = desc
      this.command = command
    }
  }
}