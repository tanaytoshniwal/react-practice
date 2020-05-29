import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import counterReducer from './store/reducers/counter'
import resultsReducer from './store/reducers/results'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const rootRecuder = combineReducers({
    ctr: counterReducer,
    res: resultsReducer
})


// LOGGER MIDDLEWARE
const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] dispatching', action)
            console.log('[Middleware] prev state', store.getState())
            const result = next(action)
            console.log('[Middleware] next state', store.getState())
            return result
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootRecuder, composeEnhancers(applyMiddleware(logger, thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
