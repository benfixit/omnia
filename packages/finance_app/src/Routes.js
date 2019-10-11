import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
