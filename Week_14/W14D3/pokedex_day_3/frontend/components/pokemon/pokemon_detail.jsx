import React from 'react';
import Item from '../items/item';
import ItemDetailContainer from '../items/item_detail_container';
import {Route} from 'react-router-dom';
import Loading from './loading';

class PokemonDetail extends React.Component {
    componentDidMount(){
        //debugger;
        this.props.requestSinglePokemon(this.props.match.params.pokemonId)
    }

    componentDidUpdate(prevProps){
        if (this.props.match.params.pokemonId !== prevProps.match.params.pokemonId){
            this.props.requestSinglePokemon(this.props.match.params.pokemonId)
        }
    }
    render(){
        const {pokemon, items}= this.props;

        if(!pokemon || !pokemon.moves) return null;
        if (this.props.loading) {return <Loading/>}

        return(
            <section className="pokemon-detail">
               <figure className="pokemon-detail-image">
                   <img src={pokemon.image_url} alt={pokemon.name}/>
                </figure> 
                <ul>
                    <li>
                        <h2>{pokemon.name}</h2>
                    </li>
                    <li>Type: {pokemon.poke_type}</li>
                    <li>Attack: {pokemon.attack}</li>
                    <li>Defense: {pokemon.defense}</li>
                    <li>Moves: {pokemon.moves.join(', ')}</li>
                </ul>
                <section className="singlePokeItems">
                     <h2>Items</h2>
                    <ul className="singlePokeItems-list">
                         {items.map(item => <Item key={item.id} item={item}/>)}
                     </ul>
                </section>
                <Route path="/pokemon/:pokemonId/item/:itemId" component ={ItemDetailContainer}/>
            </section>
        )
    }
}

export default PokemonDetail;