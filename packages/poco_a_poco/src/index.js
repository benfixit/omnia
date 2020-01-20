import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';
import App from './App';

const elementRoot = document.getElementById('root');

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  elementRoot
);
