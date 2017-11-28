import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import axiosMiddleware from 'redux-axios-middleware';
import axios, { reduxConfig } from '~/axios';
import thunkyAction from '~/middlewares/thunky-actions';
import reducer from '~/reducers';

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function store() {

	const middleware = applyMiddleware(
		thunkyAction,
		thunk,
		promiseMiddleware,
		axiosMiddleware(axios, reduxConfig)
	);

	return createStore(reducer, composeEnhancers(middleware));
}
