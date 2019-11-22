// const Game = require('/game.js')
// const game = new Game();    

class Board {
    constructor() {
        this.grid = [...Array(3)].map(ele => Array('-','-','-'));
    }
};

Board.prototype.full = function() {
    for (i=0; i < this.grid.length; i++) {
        for (j=0; j < this.grid.length; j++) {
            if (this.grid[i][j] === undefined) {
                return false;
            };
        };
    };
    return true;
};

Board.prototype.won = function() {
    if (this.full) {
        return true;
    };
};

Board.prototype.winner = function () {

};

Board.prototype.empty = function (pos) {
    return (!!this.grid[pos[0]][pos[1]]);
};

Board.prototype.placeMark = function (pos, mark) {
    [x,y] = pos;
    if (this.validPos(pos)) {
        this.grid[x][y] = mark;
    }
};

Board.prototype.validPos = function (pos) {
    if (pos[0] < 0 || pos[1] < 0 || pos[0] > 2 || pos[1] > 2) {
        return false;
    }
    else if (!this.empty(pos)) { 
        return false;
    }
    else {
        return true;
    }
};

Board.prototype.print = function() {
    this.grid.forEach(function(row) {
        console.log(row);
    });
};

Board.prototype.ttt = function() {
    
    for (let i = 0; i < this.length < i ++) {
        this.grid[0][i] 
    }
    //col
    //diag
};

Board.WINNING = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
]


board = new Board();
// board.grid[0][0] = "X"
// board.grid[0][1] = "O"
// board.grid[0][2] = "X"
// board.grid[1][0] = "O"
// board.grid[1][1] = "X"
// board.grid[1][2] = "O"
board.grid[2][0] = "X"
// board.grid[2][1] = "O"
// board.grid[2][2] = "O"
board.placeMark([0,2], "X");
board.print();