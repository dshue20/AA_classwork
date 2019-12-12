import React from 'react';
import {Link} from 'react-router-dom';

const Item = ({item}) => (
    <Link to={`/pokemon/${item.pokemon_id}/item/${item.id}`}>
        <img src={item.image_url} width='50px' height='50px'/>
    </Link>
)

export default Item;