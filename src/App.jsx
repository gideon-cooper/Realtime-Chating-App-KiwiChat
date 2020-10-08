import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './SignIn'
import Chat from './Chat'
const App = () => (
  <Router>
    <Route exact path="/" component={SignIn} />
    <Route path="/chat" component={Chat} />
  </Router>
)

export default App
