const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const PORT = process.env.PORT || 3001

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
app.use(router)

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room })
    console.log(socket.id, 'SOC1')
    if (error) {
      return cb(error)
    }
    socket.join(user.room)
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    })
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name}, has joined the room!`,
    })
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })
    cb()
  })
  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id)
    console.log(socket.id, 'SOC2')
    io.to(user.room).emit('message', { user: user.name, text: message })
    cb()
  })
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left the room.`,
      })
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  })
})

server.listen(PORT, () => console.log('Server is running on ', PORT))
