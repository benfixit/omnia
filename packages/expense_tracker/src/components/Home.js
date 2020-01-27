import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import Layout from './Layout';
import { Table } from '../styles';
import { formatter, getDecimalNumber } from '../utils/money';
import withExpenseQuery from '../hoc/withExpenseQuery';
import withIncomeQuery from '../hoc/withIncomeQuery';

const { Heading, Pane } = Picasso;

const TableContainer = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

const Th = styled(Table.Th)`
  background-color: #ffffff;
  color: #000000;
  padding: 15px;
  text-align: left;
  min-width: 70px;
  width: 200px;
`;

const Td = styled(Table.Td)`
  background-color: #ffffff;
  padding: 15px;
  text-align: left;
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  margin: 20px 0;
`;

const Home = props => {
  const { expenses, incomes } = props;

  const incomesTotal = incomes.reduce(
    (acc, item) => acc + getDecimalNumber(item.budget),
    0
  );

  const budgetedExpensesTotal = expenses.reduce(
    (acc, item) => acc + Number(item.budget),
    0
  );

  const actualBudgetsTotal = expenses.reduce(
    (acc, item) => acc + Number(item.actual),
    0
  );

  const estimatedSavings = expenses
    .filter(item => item.category.title === 'Savings')
    .reduce((acc, item) => acc + Number(item.budget), 0);

  const actualSavings = expenses
    .filter(item => item.category.title === 'Savings')
    .reduce((acc, item) => acc + Number(item.actual), 0);

  return (
    <Layout>
      <StyledHeading>Summary (February) - Estimated</StyledHeading>
      <TableContainer>
        <Table.Table>
          <tbody>
            <tr>
              <Th>Income</Th>
              <Td>{formatter.format(incomesTotal)}</Td>
            </tr>
            <tr>
              <Th>Budget (Estimated Expenses)</Th>
              <Td>
                {formatter.format(budgetedExpensesTotal - estimatedSavings)}
              </Td>
            </tr>
            <tr>
              <Th>Budget (Savings)</Th>
              <Td>{formatter.format(estimatedSavings)}</Td>
            </tr>
            <tr>
              <Th>Bank Balance</Th>
              <Td>{formatter.format(incomesTotal - budgetedExpensesTotal)}</Td>
            </tr>
            <tr>
              <Th>Savings Balance</Th>
              <Td>{formatter.format(2800000 + estimatedSavings)}</Td>
            </tr>
          </tbody>
        </Table.Table>
      </TableContainer>
      <StyledHeading>Summary (February) - Actual</StyledHeading>
      <TableContainer>
        <Table.Table>
          <tbody>
            <tr>
              <Th>Income</Th>
              <Td>{formatter.format(incomesTotal)}</Td>
            </tr>
            <tr>
              <Th>Budget (Actual Expenses)</Th>
              <Td>{formatter.format(actualBudgetsTotal - actualSavings)}</Td>
            </tr>
            <tr>
              <Th>Budget (Savings)</Th>
              <Td>{formatter.format(actualSavings)}</Td>
            </tr>
            <tr>
              <Th>Bank Balance</Th>
              <Td>{formatter.format(incomesTotal - actualBudgetsTotal)}</Td>
            </tr>
            <tr>
              <Th>Savings Balance</Th>
              <Td>{formatter.format(2800000 + actualSavings)}</Td>
            </tr>
          </tbody>
        </Table.Table>
      </TableContainer>
    </Layout>
  );
};

Home.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  incomes: PropTypes.instanceOf(Array).isRequired
};

export default compose(withRouter, withExpenseQuery, withIncomeQuery)(Home);
