import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Picasso from '@omnia/picasso';

const Expense = lazy(() => import('./components/Expense/index'));
const EditExpense = lazy(() => import('./components/Expense/EditExpense'));
const Income = lazy(() => import('./components/Income/index'));
const EditIncome = lazy(() => import('./components/Income/EditIncome'));
const Savings = lazy(() => import('./components/Savings/index'));
const EditSavings = lazy(() => import('./components/Savings/EditSavings'));
const Investment = lazy(() => import('./components/Investment/index'));
const EditInvestment = lazy(() => import('./components/Investment/Edit'));
const Charge = lazy(() => import('./components/Charge/index'));
const EditCharge = lazy(() => import('./components/Charge/EditCharge'));
const Note = lazy(() => import('./components/Note/index'));
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
          <Route path="/savings/edit/:id" component={EditSavings} />
          <Route path="/savings/:year?/:month?" component={Savings} />
          <Route path="/investments/edit/:id" component={EditInvestment} />
          <Route path="/investments/:year?/:month?" component={Investment} />
          <Route path="/charges/edit/:id" component={EditCharge} />
          <Route path="/charges/:year?/:month?" component={Charge} />
          <Route path="/notes" component={Note} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
