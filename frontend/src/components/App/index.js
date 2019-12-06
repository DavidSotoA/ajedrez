import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import { Game } from '../Game'
import io from 'socket.io-client';

const socket = io(process.env.BACKEND_URL);

const App = () => {
  return (
    <div style={{height: '100%'}}>
      <GlobalStyles/>
      <Game socket={socket}/>
    </div>

  )
}

export default App;

