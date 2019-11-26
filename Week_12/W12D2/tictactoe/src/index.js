const View = require('./ttt-view')
const Game = require('../../ttt_node_solution/game')

  $(() => {
    const game = new Game();
    const $container = $(".ttt");
    new View(game, $container)
  });
