const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const PORT = process.env.PORT || 3001

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room })
    if (error) {
      return cb(error)
    }
    console.log('wo')
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    })

    socket.join(user.room)
  })
  socket.on('disconnect', () => {
    console.log('disconnect working')
  })
})

app.use(router)
server.listen(PORT, () => console.log('Server is running on ', PORT))
