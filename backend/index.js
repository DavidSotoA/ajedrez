require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app);
const io = require('socket.io')(http)
const Game = require('./src/Game')
const { GAME_DATA_STATE } = require('./src/Response')

const game = new Game()


io.on('connection', socket => {
  console.log('==========connection==========')
  const dataResponse = game.addPlayer(socket.id).toJson()
  console.log(dataResponse)

  if(dataResponse.error) {
    socket.emit('error', dataResponse.error)
  }

  socket.emit('addPlayer', dataResponse.playerReceiver)

  if ( dataResponse.gameData.type === GAME_DATA_STATE.initGame) {
    io.emit('updateGame', dataResponse)
  }

});

http.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})