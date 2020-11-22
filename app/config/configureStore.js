import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import {createLogger} from "redux-logger/src";
import reducers from '../redux/reducers';

const logger = createLogger();

export default function configureStore() {
    return createStore(
        combineReducers({
            ...reducers
        }),
        compose(
            applyMiddleware(thunk, logger),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ),
    );
}