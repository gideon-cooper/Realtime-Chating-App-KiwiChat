import React from 'react'

export default function Message({ message, name }) {
  return (
    <div>
      {message.text}
      {name}
    </div>
  )
}
