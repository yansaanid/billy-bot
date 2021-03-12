module.exports = class Main {
  constructor(prefix, client) {
    this.prefix = prefix
    this.client = client
  }
  
  run() {
    console.log(this.prefix)
  }
}