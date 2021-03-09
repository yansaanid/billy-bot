module.exports = (cl, send, reply) => {
  cl.on("message", msg => {
    if (msg.channel.type !== "dm")
      return false

    if (msg.content.toLowerCase() === send.toLowerCase())
      msg.author.send(reply)
  })
}