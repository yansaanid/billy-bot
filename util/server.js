const express = require('express');
const server = express()

const result = require('@util/get-status')

server.get('/', (req, res)=> {
  res.setHeader('Content-Type', 'application/json')

  //res.write('<link href="https://fonts.googleapis.com/css?family=Roboto Condensed" rel="stylesheet"> <style> body {font-family: "Roboto Condensed";font-size: 22px;} <p>Hosting Active</p>')
  
  res.status(200).json(result())
  res.end()
})

function keepAlive() {
  server.listen(3000, ()=> {
    console.log("Server is online!")})
}



module.exports = keepAlive