class Player {

  constructor({id, player}) {
    this.id = id;
    this.player = player;
  }

  toJson() {
    return {
      id: this.id,
      player: this.player
    }
  }

  getId() {
    return this.id;
  }

  getPlayer() {
    return this.player;
  }
}

module.exports = Player