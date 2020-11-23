import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import {createLogger} from "redux-logger/src";
import reducers from '../redux/reducers';

const logger = createLogger();

const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export default function configureStore() {
    return createStore(
        combineReducers({
            ...reducers
        }),
        composeEnhancers(applyMiddleware(thunk, logger))
    );
}