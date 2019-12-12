import React from 'react';
import ReactDOM from 'react-dom';
import {receiveAllPokemon, requestAllPokemon} from './actions/pokemon_actions';
import * as APIUtil from './util/api_util';
import configureStore from './store/store';
import * as selector from './reducers/selectors';
import Root from './components/root'
import { HashRouter, Route } from "react-router-dom";

document.addEventListener('DOMContentLoaded', ()=>{
    const store = configureStore();
    const rootEl = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, rootEl);

    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
});

// window.receiveAllPokemon = receiveAllPokemon;
// window.requestAllPokemon = requestAllPokemon;
// window.fetchAllPokemon = APIUtil.fetchAllPokemon;
// window.selectAllPokemon = selector.selectAllPokemon;