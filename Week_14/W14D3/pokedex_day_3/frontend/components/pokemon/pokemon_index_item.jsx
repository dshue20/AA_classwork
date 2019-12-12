import React from 'react';
import { Link } from "react-router-dom";

const PokemonIndexItem = ({pokemon})=> (
    <li className="pokemon-list-item">
        <Link to={`/pokemon/${pokemon.id}`}>
            <p>{pokemon.name}</p>
            <img src={pokemon.image_url} className="pokemon-index-image"/>
        </Link>
    </li>
);

export default PokemonIndexItem