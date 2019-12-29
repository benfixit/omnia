import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const Budgets = lazy(() => import('./components/Budgets'));
const Transactions = lazy(() => import('./components/Transactions'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/budgets/:year?/:month?" component={Budgets} />
          <Route path="/transactions/:year?/:month?" component={Transactions} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
