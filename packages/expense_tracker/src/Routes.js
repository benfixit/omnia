import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Picasso from '@omnia/picasso';

const Budgets = lazy(() => import('./components/Budgets'));
const Transactions = lazy(() => import('./components/Transactions'));

const { Loading } = Picasso;

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Redirect exact from="/" to="/budgets" />
          <Route path="/budgets/:year?/:month?" component={Budgets} />
          <Route path="/transactions/:year?/:month?" component={Transactions} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
