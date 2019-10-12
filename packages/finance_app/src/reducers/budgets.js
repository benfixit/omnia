import { ADD_BUDGET, REMOVE_BUDGET } from '../actions/index';

const budgets = (state = [], action) => {
  switch (action.type) {
    case ADD_BUDGET:
      console.log(action);
      return [...state, action];
    case REMOVE_BUDGET:
      return state.filter(budget => budget.id !== action.id);
    default:
      return state;
  }
};

export default budgets;
