import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './home.scss'
const Home = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className="container">
      <div className="homeContainer">
        <h1 className="homeTitle">Start chatting</h1>
        <div>
          <input
            maxLength="10"
            type="text"
            className="homeInput"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            maxLength="10"
            className="homeInput"
            type="text"
            placeholder="Room Name"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link to={`/chat?name=${name}&room=${room}`}>
          <button
            className="homeButton"
            disabled={!name || !room}
            type="submit"
          >
            Join
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
