import React from 'react';
import Tile from './tile';
//import * as Minesweeper from '../minesweeper';

export default class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    renderBoard(){
        //console.log(this.props.board);
        return this.props.board.grid.map((row,idx) => {
            return (
                <div className="row" key={idx}>
                    {this.renderRow(row)}
                </div>
            )
        })
    }

    renderRow(row){
        return row.map((tile, idx2) => {
            return (
                //<div key={idx2}>
                    <Tile tile={tile} updateGame={this.props.updateGame} key={idx2} className='tile'/>
                //</div>
            )
        })
    }

    render(){
        return(
            <div>
                {this.renderBoard()}
            </div>
        )
    }
}