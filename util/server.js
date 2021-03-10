const express = require('express');
const server = express()

const result = require('@util/get-status')

server.all('/', (req, res)=> {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  res.status(200).json(result())
  res.end()
})

function keepAlive() {
  server.listen(3000, ()=> {
    console.log("Server is online!")})
}



module.exports = keepAlive