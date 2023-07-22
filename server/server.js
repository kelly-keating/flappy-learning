const path = require('path')
const express = require('express')

const server = express()

server.use(express.static(path.join('server', 'public')))

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = server