const { prefix } = require("../config/main.json")
const colors = require("colors")

module.exports = (cl,als,cb) => {
  if (typeof als === "string") {
      als = [ als ]
  }
  
  cl.on("message", msg => {
    const { content } = msg
    
    als.forEach(alias => {
      const comm = `${prefix}${alias}`
      
      if(content.startsWith(`${comm} `) || content === comm){
        cl.guilds.cache.forEach(guild => {
          console.log(`${colors.bgBlue.bold(guild.name)} menjalankan perintah ${colors.bgGreen.bold(comm.replace(prefix, ""))}`)
        })
        
        console.log(`Command ${colors.bgGreen.bold(comm.replace(prefix, ""))} dijalankan!`)
        cb(msg)
      }
    })
  })
}