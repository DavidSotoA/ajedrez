require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app);
const io = require('socket.io')(http)
const Game = require('./src/Game')
const { GAME_DATA_STATE } = require('./src/Response')
const { getRedisData } = require('./src/redis/index')

let game = new Game()

app.get('/data', async (_, res) => {
  const redisData = await getRedisData();
  res.send(redisData)
})

io.on('connection', async (socket) => {
  console.log('==========connection==========')
  const dataResponse = game.addPlayer(socket.id).toJson()
  console.log(dataResponse)

  if (dataResponse.error) {
    socket.emit('error', dataResponse.error)
  }

  socket.emit('addPlayer', dataResponse)

  if (dataResponse.gameData.type === GAME_DATA_STATE.initGame) {
    io.emit('updateGame', dataResponse)
  }

  socket.on('move', (move) => {
    console.log('===============move===============')
    const dataReponse = game.move(move.data).toJson()
    console.log(dataReponse)
    io.emit('updateGame', dataReponse)
  })

  socket.on('disconnect', (data) => {
    console.log('===============disconnect===============')
    console.log(data)

    // game = new Game()
  })

});

http.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})