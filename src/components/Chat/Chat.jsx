import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import Message from '../Message/Message'
import ScrollToBottom from 'react-scroll-to-bottom'
import './chat.scss'
let socket
const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = 'localhost:3001'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)
    socket.emit('join', { name, room }, () => {})
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message])
    })
    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }
  console.log(messages)
  console.log(message, messages)
  return (
    <div className="chatContainer">
      <div className="innerChatContainer">
        <div className="banner">
          <div className="leftBanner">
            <h2>{room}</h2>
          </div>
        </div>
        <div className="messageBox">
          {messages.map((message, i) => (
            <div key={i}>
              <Message message={message} name={name} />
            </div>
          ))}
        </div>
        <div className="inputContainer">
          <input
            type="text"
            className="chatInput"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
          />
          <button className="sendButton" onClick={(e) => sendMessage(e)}>
            <i class="fas fa-kiwi-bird" style={{ color: 'whitesmoke' }}></i>
          </button>
        </div>
      </div>
    </div>
  )
}
export default Chat
