import { v4 } from 'uuid';
// consts
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';
export const ADD_BUDGET = 'ADD_BUDGET';
export const REMOVE_BUDGET = 'REMOVE_BUDGET';

// action creators
export const addTransaction = payload => {
  return {
    type: ADD_TRANSACTION,
    id: v4(),
    description: payload.description,
    amount: payload.amount,
    category: payload.category,
    date: JSON.stringify(new Date()).slice(1, 11)
  };
};

export const removeTransaction = payload => {
  return {
    type: REMOVE_TRANSACTION,
    id: payload.id
  };
};

export const addBudget = payload => {
  return {
    type: ADD_BUDGET,
    id: v4(),
    budget: payload.budget,
    category: payload.category
  };
};

export const removeBudget = payload => {
  return {
    type: REMOVE_BUDGET,
    id: payload.id
  };
};
