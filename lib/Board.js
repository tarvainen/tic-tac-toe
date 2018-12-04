const EventEmitter = require('events');
const Analyzer     = require('./Analyzer');

class Board extends EventEmitter {
  constructor(game) {
    super();

    this.game = game;
    this.analyzer = new Analyzer(this);

    this.reset();
  }

  set(x, y, sign) {
    const index = Board.getIndexOf(x, y);

    if (this.state[index] !== '') {
      throw new Error(
        `Can't set value '${sign}' to slot [${x}, ${y}]: it's already reserved`
      );
    }

    this.game.log(`Set slot [${x}, ${y}] (index = ${index}) to '${sign}'`);

    this.state[index] = sign;

    this.game.log(`Board state is now ['${this.state.join(`','`)}']`);

    this.emit('change');
  }

  isFull() {
    return this.state.filter(c => c === '').length === 0;
  }

  reset() {
    this.state = Array(9).fill('');
  }

  static getIndexOf(x, y) {
    if (x < 0 || x > 2 || y < 0 || y > 2) {
      throw new Error(
        `Invalid slot [${x}, ${y}]! Coordinates should be between 0 and 2.`
      );
    }

    return 3 * x + y;
  }
}

module.exports = Board;