import React from 'react';
import PokemonIndexItem from './pokemon_index_item';

class PokemonIndex extends React.Component {
    componentDidMount(){
        this.props.requestAllPokemon();
    }

    render(){
        const {pokemon} = this.props;

        return(
            <section className="pokemon-list">
                <ul>
                    {pokemon.map(poke => <PokemonIndexItem key={poke.id} pokemon={poke}/>)}
                </ul>
            </section>
        )
    }
}

export default PokemonIndex;