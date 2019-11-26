function GameView(canvas) {
  this.ctx = canvas.getContext("2d");
  this.game = new Game(this.ctx);
}

GameView.prototype.start = function(){
  setInterval(this.game.step(), 20);
  setInterval(this.game.draw(), 20);
  this.bindKeyHandlers();
  window.requestAnimationFrame(this.start.bind(this));
}

GameView.prototype.bindKeyHandlers = function(){
  key('w', function(){ 
      this.game.ship.power([0, 1]);
  })
  key('a', function () {
    this.game.ship.power([-1, 0]);
  })
  key('s', function () {
    this.game.ship.power([0, -1]);
  })
  key('d', function () {
    this.game.ship.power([1, 0]);
  })
  
}

module.exports = GameView;