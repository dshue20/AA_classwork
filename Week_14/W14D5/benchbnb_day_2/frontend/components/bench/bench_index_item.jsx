import React from 'react';

const BenchIndexItem = bench => (
    <ul>
        <li>{bench.description}</li>
        <li>{bench.lat}</li>
        <li>{bench.lng}</li>
    </ul>
);

export default BenchIndexItem;