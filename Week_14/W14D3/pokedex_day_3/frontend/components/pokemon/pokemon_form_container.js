import {connect} from 'react-redux';
import PokemonForm from './pokemon_form';
import {createPokemon} from '../../actions/pokemon_actions';

const mapStateToProps = ({ui})=> {
    //debugger;
    return {
        errors: ui.errors
    }
};
const mapDispatchToProps = dispatch => {
    //debugger;
    return {
        createPokemon: pokemon => dispatch(createPokemon(pokemon))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonForm);