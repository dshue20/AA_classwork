import React from 'react';

export default class Tile extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.updateGame(this.props.tile, e.altKey)
    }


    pressed() {
        if (this.props.tile.flagged) {
            return (
                <div onClick={this.handleClick} className="tile flagged">
                    {'\u2691'}
                </div>
            )
        }
        else if (this.props.tile.bombed && this.props.tile.explored) {
            return (
                <div onClick={this.handleClick} className='tile bombed'>
                    {'\u2622'}
                </div>
            )
        }
        else if (this.props.tile.explored) {
            return (
                <div onClick={this.handleClick} className='tile explored'>
                    {this.props.tile.adjacentBombCount()}
                </div>
            )
        }
        else {
            return (
                <div onClick={this.handleClick} className='tile unexplored'>

                </div>
            )
        }
    }

    render(){
      return this.pressed();
    }
}