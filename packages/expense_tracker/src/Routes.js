import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Picasso from '@omnia/picasso';

const Budgets = lazy(() => import('./components/Budgets/index'));
const BudgetEdit = lazy(() => import('./components/Budgets/BudgetEdit'));
const Incomes = lazy(() => import('./components/Incomes/index'));
const IncomeEdit = lazy(() => import('./components/Incomes/IncomeEdit'));
const Home = lazy(() => import('./components/Home'));

const { Loading } = Picasso;

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/budgets/edit/:id" component={BudgetEdit} />
          <Route path="/budgets/:year?/:month?" component={Budgets} />
          <Route path="/incomes/edit/:id" component={IncomeEdit} />
          <Route path="/incomes/:year?/:month?" component={Incomes} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
