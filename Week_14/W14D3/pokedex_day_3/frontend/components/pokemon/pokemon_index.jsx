import React from 'react';
import {Route} from 'react-router-dom';
import PokemonIndexItem from './pokemon_index_item';
import PokemonDetailContainer from './pokemon_detail_container';
import PokemonFormContainer from './pokemon_form_container';
import Loading from './loading';

class PokemonIndex extends React.Component {
    componentDidMount(){
        this.props.requestAllPokemon();
    }

    render(){
        const {pokemon, loading} = this.props;
        //debugger;
        if (loading) {return <Loading/>}

        return(
            <section className="pokedex">
                <Route path="/pokemon/:pokemonId" component={PokemonDetailContainer}/>
                <ol className="pokemon-index">
                    {pokemon.map(poke => <PokemonIndexItem key={poke.id} pokemon={poke}/>)}
                </ol>
                <Route exact path="/" component={PokemonFormContainer}/>
            </section>
        )
    }
}

export default PokemonIndex;