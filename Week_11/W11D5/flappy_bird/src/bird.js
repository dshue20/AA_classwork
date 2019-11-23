const CONSTANTS = {
    GRAVITY: 0.8,
    FLAP_SPEED: -8,
    TERMINAL_VEL: 12,
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30
}
export default class Bird {
    constructor(dimensions) {
        this.velocity = 0;
        this.dimensions = dimensions;
        this.yPos = this.dimensions.height / 2;
        this.xPos = this.dimensions.width / 3;
    };
    drawBird(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.xPos, this.yPos, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    };

    animate(ctx){
        this.move();
        this.drawBird(ctx);
    }

    move(){
        this.yPos += this.velocity;
        this.velocity += CONSTANTS.GRAVITY;
    }
    flap(){
        this.velocity = CONSTANTS.FLAP_SPEED;
    }

    getBounds(){
        return {
            left: this.xPos,
            right: this.xPos + CONSTANTS.BIRD_WIDTH,
            top: this.yPos,
            bottom: this.yPos + CONSTANTS.BIRD_HEIGHT
        }
    }
}