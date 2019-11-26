// import MovingObject from './moving_object'; // ES6 syntax

const MovingObject = require("./moving_object.js")
window.MovingObject = MovingObject;

const Asteroid = require("./asteroid.js")
window.Asteroid = Asteroid;

const Game = require("./game.js")
window.Game = Game;

const GameView = require("./game_view.js")
window.GameView = GameView;

const Ship = require("./ship.js")
window.Ship = Ship;

window.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById("game-canvas");
  const gameView = new GameView(canvas);
  gameView.start();
});

