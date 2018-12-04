class Analyzer {
  constructor(board) {
    this.board = board;
    this.board.on('change', () => this.index());
  }

  isWinning(sign) {
    return this.indexed.includes(
      Array(3).fill(sign).join('')
    );
  }

  index() {
    const state = this.board.state;

    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [6, 4, 2]
    ];

    this.indexed = combinations.map(
      indexes => indexes.map(i => state[i]).join('')
    );

    this.board.game.log('Analyzer indexed', this.indexed);
  }
}

module.exports = Analyzer;