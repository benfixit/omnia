import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import Picasso from '@omnia/picasso';
import client from './apollo/client';
import store from './store';
import App from './App';

const { theme } = Picasso;

const root = document.getElementById('root');

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </ApolloProvider>,
  root
);
