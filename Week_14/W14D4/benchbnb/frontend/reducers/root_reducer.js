import { combineReducers } from "redux";
import sessionErrorsReducer from './session_errors_reducer';
import errorsReducer from './errors_reducer';
import entitiesReducer from './entities_reducer';

export default combineReducers({
    entities: entitiesReducer,
    session: sessionErrorsReducer,
    errors: errorsReducer
});