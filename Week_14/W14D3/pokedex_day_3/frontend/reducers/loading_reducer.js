import { LOAD_ALL_POKEMON, LOAD_SINGLE_POKEMON, RECEIVE_ALL_POKEMON, RECEIVE_SINGLE_POKEMON, RECEIVE_POKEMON_ERRORS} from '../actions/pokemon_actions';
const initialState = {
    indexLoading: false,
    detailLoading: false
    //loading: false
};

const loadingReducer = (state = initialState, action) => {
    Object.freeze(state);
    //debugger;
    switch (action.type) {
        case LOAD_ALL_POKEMON:
            return Object.assign({}, state, {indexLoading: true})
        case LOAD_SINGLE_POKEMON:
            return Object.assign({}, state, {detailLoading: true})
        case RECEIVE_ALL_POKEMON:
            return Object.assign({}, state, { indexLoading: false })
        case RECEIVE_SINGLE_POKEMON:
            return Object.assign({}, state, { detailLoading: false })
        case RECEIVE_POKEMON_ERRORS:
            return Object.assign({}, state, { indexLoading: false }) 
        default:
            return state;
    }

};

export default loadingReducer;