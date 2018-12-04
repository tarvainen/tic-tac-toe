const toe = require('./lib');

// Create new game
const game = new toe.Game();

game.on('end', () => {
  let msg = 'Game ended ';

  if (!game.getWinner()) {
    console.log(msg + 'as a tie');
  } else {
    const winner = game.getWinner() === game.player1 ? 'player 1' : 'player 2';
    console.log(msg + 'to the win of ' + winner);
  }
});

// Set logger for debugging
game.logger = console.log;

// Randomly run through all available moves
[
  [0, 0], [0, 1], [0, 2],
  [1, 0], [1, 1], [1, 2],
  [2, 0], [2, 1], [2, 2],
].reduce(
  (a,v) => a.splice(
    Math.floor(Math.random() * a.length), 0, v
  ) && a,
  []
).every(coord => {
  game.getPlayerInTurn().touch(coord[0], coord[1]);

  return game.running;
});
