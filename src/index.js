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
import "regenerator-runtime/runtime";
import createSagaMiddleware from 'redux-saga'
import { watchAuth } from './store/sagas/sagaWatchAuth';
import {watchOrder} from './store/sagas/sagaWatchOrder'
import {watchBurger} from './store/sagas/sagaWatchBurger'

//For using redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Combining both reducers
const rootReducer = combineReducers({
    burger: reducerBurgerBuilder,
    order:reducerOrder,
    auth: reducerAuth
})
//SagaMiddlewares
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

//Calling Saga Watch
sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchOrder)
sagaMiddleware.run(watchBurger)
ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));