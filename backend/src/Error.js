class Error {
  constructor(msg) {
    this.msg = msg
  }

  getMsg() {
    return this.msg
  }

  toJson() {
    return { error: this.msg }
  }

}

const ERROR_MSG = {
  roomFull: 'The room is full, try in some minutes again'
}

module.exports = {
  Error,
  ERROR_MSG
}