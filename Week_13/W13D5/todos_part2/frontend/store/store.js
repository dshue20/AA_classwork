import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from '../middleware/thunk';

const configureStore = () => {
    const d = new Date();
    console.log(d.getHours() + ':' + d.getMinutes());
    return createStore(rootReducer, {}, applyMiddleware(thunk))
};

export default configureStore;