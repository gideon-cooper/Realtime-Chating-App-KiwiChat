const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 3001

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
  console.log('Socket connection is working')

  socket.on('disconnect', () => {
    console.log('disconnect working')
  })
})

app.use(router)
server.listen(PORT, () => console.log('Server is running on ', PORT))
