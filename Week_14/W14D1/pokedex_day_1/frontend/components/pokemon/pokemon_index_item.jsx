import React from 'react';

const PokemonIndexItem = ({pokemon})=> (
    <li className="pokemon-list-item">
        <p>{pokemon.name}</p>
        <img src={pokemon.image_url}/>
    </li>
);

export default PokemonIndexItem