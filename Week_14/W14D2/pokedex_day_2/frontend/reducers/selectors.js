export const selectAllPokemon = state => (Object.values(state.entities.pokemon));

export const selectSinglePokemonItems = (state, pokemon) => {
    //debugger;
    //return state.entities.pokemon[pokemonId].item_ids.map(id => state.entities.items[id])
    return pokemon? pokemon.item_ids.map(id => state.entities.items[id]) : []
};

export const selectPokemonItem = (state, itemId) => (
    state.entities.items[itemId]
);