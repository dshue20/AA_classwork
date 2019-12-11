import * as APIUtil from '../util/api_util';

export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON";
export const RECEIVE_SINGLE_POKEMON = "RECEIVE_SINGLE_POKEMON";
export const CREATE_POKEMON = 'CREATE_POKEMON';

export const receiveAllPokemon = pokemon => ({
    type: RECEIVE_ALL_POKEMON,
    pokemon
})

export const requestAllPokemon = () => (dispatch) => (
    APIUtil.fetchAllPokemon()
        .then(pokemon => dispatch(receiveAllPokemon(pokemon)))
);

export const requestSinglePokemon = (id)=> (dispatch)=>{
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
    })
);