import {connect} from 'react-redux';
import PokemonDetail from './pokemon_detail';
import {selectSinglePokemonItems} from '../../reducers/selectors';
import {requestSinglePokemon} from '../../actions/pokemon_actions';

const mapStateToProps = (state, ownProps) => {
    const pokemon = state.entities.pokemon[ownProps.match.params.pokemonId];
    //debugger;
    return {
        pokemon,
        items: selectSinglePokemonItems(state, pokemon)
    }
}

const mapDispatchToProps = dispatch => ({
    requestSinglePokemon: id => dispatch(requestSinglePokemon(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PokemonDetail);