const PIPE_CONSTANTS = {
  WIDTH: 60,
  GAP_SIZE: 150,
  PIPE_SPACING: 220,
  PIPE_SPEED: 2
}
export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
    const initialPipeDistance = this.dimensions.width + PIPE_CONSTANTS.PIPE_SPACING;
    this.pipes = [
      this.pipe(initialPipeDistance),
      this.pipe(initialPipeDistance + PIPE_CONSTANTS.PIPE_SPACING),
      this.pipe(initialPipeDistance + 2 * PIPE_CONSTANTS.PIPE_SPACING)
    ];
  }

  drawBackground(ctx) {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(ctx) {
    this.drawBackground(ctx);
    this.movePipes();
    this.drawPipes(ctx);
  }

  movePipes(){
    this.pipes.forEach(pipe => {
      pipe.topPipe.left -= PIPE_CONSTANTS.PIPE_SPEED;
      pipe.topPipe.right -= PIPE_CONSTANTS.PIPE_SPEED;
      pipe.bottomPipe.left -= PIPE_CONSTANTS.PIPE_SPEED;
      pipe.bottomPipe.right -= PIPE_CONSTANTS.PIPE_SPEED;
    });
    if (this.pipes[0].topPipe.right <= 0){
      this.pipes.shift();
      const xSpacing = this.pipes[1].topPipe.left + PIPE_CONSTANTS.PIPE_SPACING;
      this.pipes.push(this.pipe(xSpacing));
    }
  }

  pipe(x){
    const lengthRange = this.dimensions.height - PIPE_CONSTANTS.GAP_SIZE;
    const pipeLength =  (Math.random() * lengthRange);
    const pipe = {
      topPipe: {
        left: x,
        right: PIPE_CONSTANTS.WIDTH + x,
        top: 0,
        bottom: pipeLength
      },
      bottomPipe: {
        left: x,
        right: PIPE_CONSTANTS.WIDTH + x,
        top: pipeLength + PIPE_CONSTANTS.GAP_SIZE,
        bottom: this.dimensions.height
      }
    }
    return pipe;
  }

  drawPipes(ctx) {
    this.pipes.forEach(pipe => {
      ctx.fillStyle = "green";
      //top pipe
      ctx.fillRect(
        pipe.topPipe.left,
        pipe.topPipe.top,
        PIPE_CONSTANTS.WIDTH,
        pipe.topPipe.bottom - pipe.topPipe.top
      )
      //bottom pipe
      ctx.fillRect(
        pipe.bottomPipe.left,
        pipe.bottomPipe.top,
        PIPE_CONSTANTS.WIDTH,
        pipe.bottomPipe.bottom - pipe.bottomPipe.top
      )
    })
  }

  collidesWith(bounds) {
    const touch = function(point1, point2) {
      if (point1.left > point2.right || point2.right < point2.left) {
        return false;
      };
      if (point1.top > point2.bottom || point1.bottom < point2.top) {
        return false;
      };
      return true;
    }
    let collision = false;
  }
}