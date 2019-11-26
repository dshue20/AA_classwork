const Util = require("./util.js");

const CONSTANTS = {width: 1000, height: 1000, num_asteroids: 10}

function Game (ctx) {
  this.ctx = ctx;
  this.asteroids = [];
  this.addObjects();
}

Game.prototype.randomPosition = function() {
  return [Math.floor(Math.random() * CONSTANTS["width"]), Math.floor(Math.random() * CONSTANTS["height"])];
}

Game.prototype.addObjects = function() {
  for (let i = 0; i < CONSTANTS["num_asteroids"]; i++){
    const randX = Math.floor(Math.random() * CONSTANTS["width"]);
    const randY = Math.floor(Math.random() * CONSTANTS["height"]);
    this.asteroids.push(new Asteroid({pos: [randX, randY], game: this}));
  };
  this.ship = new Ship({pos: this.randomPosition(), game: this});
}

Game.prototype.draw = function() {
  //draw canvas
  // maybe add stars later? some kind of background
  this.ctx.clearRect(0, 0, CONSTANTS["width"], CONSTANTS["height"]);
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, 0, CONSTANTS["width"], CONSTANTS["height"]);
  
  //draw asteroids
  this.asteroids.forEach(asteroid => asteroid.draw(this.ctx));

  //draw ship
  this.ship.draw(this.ctx);
}

Game.prototype.moveObjects = function(){
  this.asteroids.forEach(asteroid => asteroid.move());
  this.ship.move();
}

Game.prototype.wrap = function(pos){
  if (pos[0] > CONSTANTS["width"]){
    pos[0] -= CONSTANTS["width"];
  }
  else if (pos[0] < 0){
    pos[0] += CONSTANTS["width"];
  };
  
  if (pos[1] > CONSTANTS["height"]){
    pos[1] -= CONSTANTS["height"];
  }
  else if (pos[1] < 0){
    pos[1] += CONSTANTS["height"];
  };

  return pos;
}

Game.prototype.checkCollisions = function() {
  for (let i = 0; i < this.asteroids.length; i++){
    if (this.ship.isCollidedWith(this.asteroids[i])){
      alert("Collision")
      this.asteroids[i].collideWith(this.ship);
    }
  }
}

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.remove = function(asteroid) {
  asteroid.radius = 0;
}

Game.prototype.delete = function(object) {
  object.forEach(asteroid => this.asteroids.splice(this.asteroids.indexOf(asteroid), 1));
}

module.exports = Game; 