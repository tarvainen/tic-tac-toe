class Player {
  constructor(game, sign) {
    this.game = game;
    this.sign = sign;
    this.isAi = false;
  }

  touch(x, y) {
    this.game.board.set(x, y, this.sign);
  }

  teach() {
    this.isAi = true;
  }

  isWinner() {
    return this.game.board.analyzer.isWinning(this.sign);
  }
}

module.exports = Player;