import React from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import { Layout as LayoutStyle, Table } from '../styles';

const TransactionsRow = styled(LayoutStyle.Row)`
  justify-content: center;
`;

const Transactions = () => {
  return (
    <Layout>
      <TransactionsRow>
        <h1>Transactions</h1>
      </TransactionsRow>
      <TransactionsRow>
        <Table.Table>
          <thead>
            <tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Amount</Table.Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Table.Td>Date</Table.Td>
              <Table.Td>Description</Table.Td>
              <Table.Td>Category</Table.Td>
              <Table.Td>Amount</Table.Td>
            </tr>
            <tr>
              <Table.Td>Date</Table.Td>
              <Table.Td>Description</Table.Td>
              <Table.Td>Category</Table.Td>
              <Table.Td>Amount</Table.Td>
            </tr>
          </tbody>
        </Table.Table>
      </TransactionsRow>
    </Layout>
  );
};

export default Transactions;
