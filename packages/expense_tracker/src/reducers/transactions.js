import { ADD_TRANSACTION, REMOVE_TRANSACTION } from '../actions/index';

const transactions = (state = [], action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return [...state, action];
    case REMOVE_TRANSACTION:
      return state.filter(transaction => transaction.id !== action.id);
    default:
      return state;
  }
};

export default transactions;
