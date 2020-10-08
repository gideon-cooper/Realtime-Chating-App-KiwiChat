import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

const Chat = ({ location }) => {
  useEffect(() => {
    const query = queryString.parse(location.search)

    console.log(query)
  })
  return <h1>Chat</h1>
}
export default Chat
