import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import reducerBurgerBuilder from './store/reducer/reducerBurgerBuilder';
import thunk from 'redux-thunk';
import reducerOrder from './store/reducer/reducerOrder';
import reducerAuth from './store/reducer/reducerAuth';
import { watchAuth } from './store/sagas/sagaAuth';
import "regenerator-runtime/runtime";
import createSagaMiddleware from 'redux-saga'

//For using redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Combining both reducers
const rootReducer = combineReducers({
    burger: reducerBurgerBuilder,
    order:reducerOrder,
    auth: reducerAuth
})
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));
sagaMiddleware.run(watchAuth)
ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));