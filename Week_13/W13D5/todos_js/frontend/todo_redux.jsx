import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import rootReducer from './reducers/root_reducer';
import {receiveTodo, receiveTodos} from './actions/todo_actions';
import App from './components/app';
import Root from './components/root.jsx';
import allTodos from './reducers/selectors';

//window.store = configureStore(rootReducer);

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore(rootReducer);
    window.store = store;
    //debugger;
    window.receiveTodo = receiveTodo;
    window.receiveTodos = receiveTodos;
    window.allTodos = allTodos;

    const root = document.getElementById('content');
    ReactDOM.render(<Root store={store}/>, root);
});