import Level from "./level";
import Bird from "./bird";

export default class FlappyBird {
  
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.restart();
    this.eventHandler();
    //debugger;
  };

  animate() {
    this.level.animate(this.ctx);
    this.bird.animate(this.ctx);
    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    };
  };

  restart() {
    this.running = false;
    this.bird = new Bird(this.dimensions);
    this.level = new Level(this.dimensions);
    this.animate();
  };

  play() {
    this.running = true;
    this.animate();
  };

  click(e) {
    if (!this.running) {
      this.play();
    };
    this.bird.flap();
  };

  eventHandler(){
    this.clickHandler = this.click.bind(this);
    this.ctx.canvas.addEventListener("mousedown", this.clickHandler)
  };
}