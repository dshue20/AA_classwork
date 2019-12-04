import React from 'react';
import Board from './board';
import * as Minesweeper from '../minesweeper';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = { board: new Minesweeper.Board(10,10) };
        this.updateGame = this.updateGame.bind(this);
    }

    updateGame(tile, flagged){
        if (flagged) {
            tile.toggleFlag();
        }
        else {
            tile.explore();
        }
        this.setState({ board: this.state.board });
    }

    render(){
        let gameOver;
        if (this.state.board.won()) gameOver = <h1>You won!!!</h1>
        if (this.state.board.lost()) gameOver = <h1>You lost</h1>
        return(
            <div>
                {gameOver}
                <Board board={this.state.board} updateGame={this.updateGame} />
            </div>
        )
    }
}