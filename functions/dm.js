module.exports = (cl, send, indm = true, reply) => {
  cl.on("message", msg => {
    if (indm === true) {
      if(msg.channel.type !== "dm")
        return false
    }
    
    if (msg.content.toLowerCase() === send.toLowerCase())
      msg.author.send(reply)
  })
}