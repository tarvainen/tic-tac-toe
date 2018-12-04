const Board  = require('./Board');
const Player = require('./Player');
const EventEmitter = require('events');

class Game extends EventEmitter {
  constructor() {
    super();

    this.board = new Board(this);
    this.board.on('change', () => this.check());

    this.player1 = new Player(this, 'X');
    this.player2 = new Player(this, '0');

    this.players = [this.player1, this.player2];

    this.logger = () => {};
    this.reset();
  }

  getPlayerInTurn() {
    return this.players.reverse().slice().pop();
  }

  getWinner() {
    return this.player1.isWinner() ?
      this.player1 : (
        this.player2.isWinner() ? this.player2 : null
      )
    ;
  }

  check() {
    const full   = this.board.isFull();
    const winner = this.getWinner();

    if (full || winner) {
      this.emit('end');
      this.running = false;
    }
  }

  reset() {
    this.board.reset();
    this.running = true;
  }

  log() {
    (this.logger || (() => {})).apply(null, arguments);
  }
}

module.exports = Game;