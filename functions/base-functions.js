module.exports = (client, options, fileName, chalk) => {
  let {
    enable = true,
    callback
  } = options
  
  const nameFeature = chalk.cyan.bgBlack.bold(fileName)
  const checkEnabled = (enable)?chalk.green.bold(`ENABLED ✅`):chalk.red.bold(`DISABLE ❌`)
  
  console.log(`${nameFeature} is ${checkEnabled}`)
  
  if (!enable) return
  callback(client)
}