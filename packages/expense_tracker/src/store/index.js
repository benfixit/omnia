import { applyMiddleware, combineReducers, createStore } from 'redux';
import { transactions, budgets } from '../reducers';
import { saver } from '../middleware';

const initialState = localStorage.getItem('redux-store')
  ? JSON.parse(localStorage.getItem('redux-store'))
  : {};

const reducers = combineReducers({
  transactions,
  budgets
});

const store = createStore(reducers, initialState, applyMiddleware(saver));

export default store;
