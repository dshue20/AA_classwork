import * as APIUtil from '../util/api_util';

export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON";
export const RECEIVE_SINGLE_POKEMON = "RECEIVE_SINGLE_POKEMON";
export const RECEIVE_POKEMON_ERRORS = "RECEIVE_POKEMON_ERRORS";
export const LOAD_ALL_POKEMON = "LOAD_ALL_POKEMON";
export const LOAD_SINGLE_POKEMON = "LOAD_SINGLE_POKEMON";

export const receiveAllPokemon = pokemon => ({
    type: RECEIVE_ALL_POKEMON,
    pokemon
})

export const requestAllPokemon = () => (dispatch) => {
    dispatch(loadAllPokemon());
    return APIUtil.fetchAllPokemon()
        .then(pokemon => dispatch(receiveAllPokemon(pokemon)))
};

export const requestSinglePokemon = (id)=> (dispatch)=>{
    dispatch(loadSinglePokemon());
    return APIUtil.fetchSinglePokemon(id).then(pokemon =>{
        //debugger;
        dispatch(receiveSinglePokemon(pokemon));
        return pokemon;
    });
}

export const receiveSinglePokemon = payload => ({
    type: RECEIVE_SINGLE_POKEMON,
    payload,
})

export const createPokemon = pokemon => dispatch => (
    APIUtil.createPokemon(pokemon).then(pokemon => {
        dispatch(receiveSinglePokemon(pokemon));
        return pokemon;
    }, 
        (errors) => dispatch(receivePokemonErrors(errors.responseJSON))
    )
);

export const updatePokemon = pokemon => dispatch => (
    APIUtil.updatePokemon(pokemon).then(pokemon => {
        dispatch(receiveSinglePokemon(pokemon));
        return pokemon;
    },
        (errors) => dispatch(receivePokemonErrors(errors.responseJSON))
    )
);

export const receivePokemonErrors = errors =>({
    type: RECEIVE_POKEMON_ERRORS,
    errors
});
export const loadSinglePokemon = ()=>({
    type: LOAD_SINGLE_POKEMON
});

export const loadAllPokemon = () => ({
    type: LOAD_ALL_POKEMON
});