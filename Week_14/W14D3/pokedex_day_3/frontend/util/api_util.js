export const fetchAllPokemon = () => (
    $.ajax({
        method: 'GET',
        url: 'api/pokemon'
    })
);

export const fetchSinglePokemon = (id) => (
    $.ajax({
        method: 'GET',
        url: `api/pokemon/${id}`
    })
);

export const createPokemon = (pokemon) => {
    return $.ajax({
        method: 'POST',
        url: 'api/pokemon/',
        data: {pokemon}
    });
}

export const updatePokemon = (pokemon) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/pokemon/${id}`,
        data: { pokemon }
    });
}