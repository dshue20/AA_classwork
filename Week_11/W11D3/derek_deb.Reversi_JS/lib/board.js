let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  const grid = [...Array(8)].map(ele => Array(8));
  grid[3][3] = new Piece("white");
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");
  grid[4][4] = new Piece("white");

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  const x = pos[0];
  const y = pos[1];
  // if (x > 7 || y > 7 || x < 0 || y < 0)
  if (!this.isValidPos(pos)){
    throw new Error ("Invalid position");
  }
  else {
    return this.grid[x][y];
  }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length > 0;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (!this.isOccupied(pos)){
    return false;
  }
  else {
    return this.getPiece(pos).color === color;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  const x = pos[0];
  const y = pos[1];
  return !(this.grid[x][y] === undefined);
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !this.hasMove("white") && !this.hasMove("black");
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  const x = pos[0];
  const y = pos[1];
  return !(x > 7 || y > 7 || x < 0 || y < 0);
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {

    if (piecesToFlip === undefined) {
      piecesToFlip = [];
    }

    let newPos = [pos[0] + dir[0], pos[1] + dir[1]];

    if (!board.isValidPos(newPos)) {
      // console.log("Invalid position")
      return null;
    } 
    else if (!board.isOccupied(newPos)) {
      // console.log("isOccupied")
      return null;
    }
    else if (board.isMine(newPos, color)){
      return piecesToFlip.length > 0 ? piecesToFlip : null;
    }
    else {
      piecesToFlip.push(newPos);
      return _positionsToFlip(board, newPos, color, dir, piecesToFlip);
    }
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  let that = this;
  if (!this.validMove(pos, color)){
    throw new Error('Invalid Move!!!');
  }
  else {
    this.grid[pos[0]][pos[1]] = new Piece(color);
    posToFlip = [];
    Board.DIRS.forEach(dir => posToFlip = posToFlip.concat(_positionsToFlip(this, pos, color, dir)));
    posToFlip.forEach(function(pos) {
      // console.log(pos);
      if (pos != null) {
        // console.log(that.getPiece(pos).color);
        that.getPiece(pos).flip();
        // console.log(that.getPiece(pos).color);
      }
    });
    
  }
  return this;
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
//   for (let i = 0; i < 7; i++){
//     let row = " " + i + "|";
  }

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {

  if (this.isOccupied(pos)){
    return false;
  }
  for (let i = 0; i < Board.DIRS.length; i++){
    let dir = Board.DIRS[i];
    // console.log(_positionsToFlip(this, pos, color, dir));
    if (_positionsToFlip(this, pos, color, dir)) {
      return true ;
    }
  }
  return false;
};

// const b = function(x) {
//   if (x === undefined) {
//     return "hi";
//   }
//   return x;
// };

// dir = [0,1] => [0,2] [0,3].....
// dir = [1, -1] => [2,-2] [3,-3]......

// dir = [1,1]

// dir = [-1,-1]
// [_, _, W, _, _, _]
// [_, B, _, _, _, _]
// [W, _, _, _, _, _]
// [_, _, _, _, _, _]

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  const validArr = [];
  for (let i = 0; i < 8; i++){
    for (let j = 0; j < 8; j++){
      if(this.validMove([i,j], color)){
        validArr.push([i,j]);
      }
    }
  }
  return validArr;
};

module.exports = Board;