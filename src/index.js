import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
let store = createStore(
	reducer,
	applyMiddleware(
      thunkMiddleware
    ));


ReactDOM.render(
	<Provider store={store }> 
		<App />
	</Provider>, 
	document.getElementById('root'));