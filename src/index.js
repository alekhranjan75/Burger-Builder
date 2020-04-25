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


//For using redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Combining both reducers
const rootReducer = combineReducers({
    burger: reducerBurgerBuilder,
    order:reducerOrder,
    auth: reducerAuth
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));