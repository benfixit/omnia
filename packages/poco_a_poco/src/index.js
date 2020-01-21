import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import Picasso from '@omnia/picasso';
import client from './apollo/client';
import App from './App';

const { theme } = Picasso;

const elementRoot = document.getElementById('root');

render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  elementRoot
);
