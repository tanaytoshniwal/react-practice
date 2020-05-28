import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux'
import counterReducer from './store/reducers/counter'
import resultsReducer from './store/reducers/results'
import { Provider } from 'react-redux'

const rootRecuder = combineReducers({
    ctr: counterReducer,
    res: resultsReducer
})

const store = createStore(rootRecuder)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
