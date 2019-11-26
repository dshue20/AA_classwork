const Util = require("./util.js");

const DEFAULTS = {radius: 10, color: "green"};

function Ship(options) {
  options = options || {};
  options.radius = DEFAULTS["radius"];
  options.color = DEFAULTS["color"]
  options.vel = [0,0];
  options.pos = options["pos"];
  options.game = options["game"];
  MovingObject.call(this, options);
}
Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.vel = [0,0];
  this.pos = this.game.randomPosition();
}

Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
}

module.exports = Ship;