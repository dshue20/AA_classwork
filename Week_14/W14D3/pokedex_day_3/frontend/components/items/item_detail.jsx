import React from 'react';

const ItemDetail = ({item}) =>(
    <ul>
        <li><h3>{item.name}</h3></li>
        <li><h4>Happiness: {item.happiness}</h4></li>
        <li><h4>Price: ${item.price}</h4></li>
    </ul>
);

export default ItemDetail