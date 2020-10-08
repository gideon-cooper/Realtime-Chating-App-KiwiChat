import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  return (
    <div className="Container">
      <div className="joinContainer">
        <h1>Join a room</h1>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <Link to={`/chat?name=${name}&room=${room}`}>
          <button type="submit">Join</button>
        </Link>
      </div>
    </div>
  )
}
export default Home
