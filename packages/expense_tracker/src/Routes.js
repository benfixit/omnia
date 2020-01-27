import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Picasso from '@omnia/picasso';

const Expense = lazy(() => import('./components/Expense/index'));
const EditExpense = lazy(() => import('./components/Expense/EditExpense'));
const Income = lazy(() => import('./components/Income/index'));
const EditIncome = lazy(() => import('./components/Income/EditIncome'));
const Home = lazy(() => import('./components/Home'));

const { Loading } = Picasso;

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/expenses/edit/:id" component={EditExpense} />
          <Route path="/expenses/:year?/:month?" component={Expense} />
          <Route path="/incomes/edit/:id" component={EditIncome} />
          <Route path="/incomes/:year?/:month?" component={Income} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
