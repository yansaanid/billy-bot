const { prefix } = require("@config/main.json")

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
          console.log(`${guild.name} menjalankan perintah ${comm.replace(prefix, "")}`)
        })
        
        console.log(`Command ${comm.replace(prefix, "")} dijalankan!`)
        cb(msg)
      }
    })
  })
}