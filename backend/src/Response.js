
const GAME_DATA_STATE = {
  move: 'move',
  initGame: 'initGame',
  waitForPlayer: 'waitForPlayer'
}


class GameData {

  constructor({ currentPlayer, fromIndex, toIndex, type }) {
    this.currentPlayer = currentPlayer
    this.fromIndex = fromIndex
    this.toIndex = toIndex
    this.type = type
  }

  toJson() {
    return {
      type: this.type,
      currentPlayer: this.currentPlayer,
      fromIndex: this.fromIndex,
      toIndex: this.toIndex
    }
  }
}

class Response {

  constructor({ gameData, playerReceiver, error }) {
    this.gameData = gameData;
    this.playerReceiver = playerReceiver;
    this.error = error;
  }

  toJson() {
    let response = {}
    if (this.gameData) response = { gameData: this.gameData.toJson(), playerReceiver: this.playerReceiver.toJson() }
    if (this.error) response.error = error
    return response
  }

}

module.exports = {
  Response,
  GameData,
  GAME_DATA_STATE
} 