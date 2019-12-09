const Player = require('./Player')
const { GameData, GAME_DATA_STATE, Response } = require('./Response')
const { Error, ERROR_MSG } = require('./Error')

const PLAYERS = {
  white: 0,
  black: 1
}


class Game {

  constructor() {
    this.gamePlayers = {}
    this.players = []
    this.currentPlayer;
    this.history = []
  }

  reset() {
    this.players = []
    this.currentPlayer;
    this.history = []
  }

  move(move) {
    this.updatePlayer()
    const gameData = new GameData({ currentPlayer: this.currentPlayer,
                                    fromIndex: move.fromIndex,
                                    toIndex: move.toIndex,
                                    type: GAME_DATA_STATE.move })
    this.history.push(gameData)
    return new Response({gameData, playerReceiver: this.currentPlayer})
  }

  updatePlayer() {

   this.currentPlayer = this.currentPlayer.id === this.players[PLAYERS.white].id ? this.players[PLAYERS.black] : this.players[PLAYERS.white]
  }

  isReady() {
    return this.players.length === 2;
  }

  initGame() {
    this.currentPlayer = this.players[PLAYERS.white];
    const gameData = new GameData({ currentPlayer: this.currentPlayer, type: GAME_DATA_STATE.initGame })
    this.history.push(gameData)
    return gameData
  }

  addFirstPlayer(playerId) {
    const player = new Player({ id: playerId, player: PLAYERS.white })
    this.players.push(player)
    const data = new GameData({ type: GAME_DATA_STATE.waitForPlayer })
    this.history.push(data)
    return new Response( {gameData: data, playerReceiver: player} )
  }

  addSecondPlayer(playerId) {
    const player = new Player({ id: playerId, player: PLAYERS.black })
    this.players.push(player)
    const gameData = this.initGame()
    return new Response({gameData, playerReceiver: player})
  }

  addPlayer(playerId) {
    if (this.players.length >= 2) return new Error(ERROR_MSG.roomFull)
    if (this.players.length === 0) return this.addFirstPlayer(playerId)
    return this.addSecondPlayer(playerId)
  }

  getPlayer(playerId) {
    return this.players.find(player => player.getId() === playerId)
  }

  getCurrentPlayer() {
    return this.currentPlayer
  }
}


module.exports = Game