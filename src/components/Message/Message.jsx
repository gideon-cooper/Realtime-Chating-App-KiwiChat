import React from 'react'

export default function Message({ message, name }) {
  let currentUser = false

  if (message.user === name) {
    currentUser = true
  }
  return currentUser ? (
    <div>
      {message.text}
      {name}
    </div>
  ) : (
    <div>
      {message.text}
      {message.user}
    </div>
  )
}
