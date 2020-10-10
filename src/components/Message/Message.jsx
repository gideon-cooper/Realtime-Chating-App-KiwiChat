import React from 'react'
import './message.scss'

export default function Message({ message, name }) {
  let currentUser = false
  let lowerName = name.toLowerCase()
  if (message.user === lowerName) {
    currentUser = true
  }
  return currentUser ? (
    <div
      className="messageContainer"
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <p className="messageUser">{name}</p>
      <div className="textContainer">
        <p className="messageText">{message.text}</p>
      </div>
    </div>
  ) : (
    <div
      className="messageContainer"
      style={{ display: 'flex', justifyContent: 'flex-start' }}
    >
      <div className="textContainer">
        <p className="messageText">{message.text}</p>
      </div>
      <p className="messageUser">{message.user}</p>
    </div>
  )
}
