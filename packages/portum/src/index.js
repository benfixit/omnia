import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Picasso from '@omnia/picasso';
import App from './App';

const { theme } = Picasso;

const elementRoot = document.getElementById('root');

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  elementRoot
);
