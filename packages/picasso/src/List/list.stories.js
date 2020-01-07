import React from 'react';
import List from './index';

export default {
  title: 'List',
  component: List
};

export const BasicList = () => (
  <List>
    <List.Item>Liverpool FC</List.Item>
    <List.Item>Leicester FC</List.Item>
    <List.Item>Manchester City FC</List.Item>
    <List.Item>Chelsea FC</List.Item>
  </List>
);
