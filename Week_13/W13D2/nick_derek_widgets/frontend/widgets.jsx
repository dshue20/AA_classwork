import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Tab from './tabs';
import Weather from './weather';
import Autocomplete from './autocomplete';

const tabArray = [
  { title: "one", content: "I am the first" },
  { title: "two", content: "I am the second" },
  { title: "three", content: "I am the third" }
];

const names = [
    'Joey',
    'Batman',
    'Spiderman',
    'Iron Man',
    'Thor',
    'Kenny',
    'Barry',
    'Carl'

]

const Root = () => (
    <div>
        <Clock />
        <Weather />
        <Tab tabs={tabArray}/>
        <Autocomplete names={names}/>
    </div>
)

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Root />, document.getElementById('main'));
})