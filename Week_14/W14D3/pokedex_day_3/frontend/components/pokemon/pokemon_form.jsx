import React from 'react';
import { withRouter } from "react-router-dom";

class PokemonForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            image_url: "",
            poke_type: "bug",
            attack: "",
            defense: "",
            moves: {}
        };
        this.updateMoves = this.updateMoves.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // static getDerivedStateFromProps(props, state) {
    //     // if we get a different post in props, we'll need to set state
    //     if (props.post.id !== state.id) {
    //         return props.post;
    //     }
    // }
    handleSubmit(e){
        e.preventDefault();
        this.props.createPokemon(this.state)
            .then((data)=> {this.props.history.push(`/pokemon/${data.pokemon.id}`)});
    }
    
    update(property) {
        return e => this.setState({ [property]: e.target.value });
    }

    updateMoves(moveNumber){
        return e => this.setState({
            moves: Object.assign({}, this.state.moves, { [moveNumber]: e.target.value })
        });
    }

    errors(){
        if (this.props.errors){
            return (
                this.props.errors.map((error, i) => {return (<li className="error" key={i}>{error}</li>)})
            );
        }
    }

    render(){
        return (
            <section className="pokemon-form-section">
                <ul>{this.errors()}</ul>

                <form className="pokemon-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.name} placeholder="Name" onChange={this.update("name")}/>
                    <input type="text" value={this.state.image_url} placeholder="Image Url" onChange={this.update("image_url")}/>
                    <select value="Bug" value={this.state.poke_type} onChange={this.update("poke_type")}>
                        {POKEMON_TYPES.map((type, idx) => (
                            <option value={type} key={idx}>{type}</option>
                        ))}
                    </select>
                    <input type="text" value={this.state.attack} placeholder="Attack" onChange={this.update("attack")}/>
                    <input type="text" value={this.state.defense} placeholder="Defense" onChange={this.update("defense")}/>
                    <input type="text" value={this.state.moves.move1 ||""} placeholder="Move 1" onChange={this.updateMoves("move1")}/>
                    <input type="text" value={this.state.moves.move2 || ""} placeholder="Move 2" onChange={this.updateMoves("move2")}/>
                    <button>Create Pokemon</button>
                </form>
            </section>
        )
    }
}

export default withRouter(PokemonForm);