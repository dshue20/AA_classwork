const Util = require("./util.js");

const DEFAULTS = {color: "gray", radius: 20};

function Asteroid(options) {
  options = options || {};
  options.color = DEFAULTS["color"];
  options.radius = DEFAULTS["radius"];
  options.vel = Util.randomVec(5);
  options.pos = options["pos"];
  options.game = options["game"];
  MovingObject.call(this, options);
}
Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) { otherObject.relocate() };
}

module.exports = Asteroid;