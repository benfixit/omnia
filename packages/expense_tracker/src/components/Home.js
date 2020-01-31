import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import Layout from './Layout';
import { Table } from '../styles';
import { formatter, getDecimalNumber } from '../utils/money';
import { getYearAndMonth, getSavingsIncomeMonthAndYear } from '../utils/date';
import { INITIAL_MONEY_SAVED } from '../utils/constants';
import withExpenseQuery from '../hoc/withExpenseQuery';
import withIncomeQuery from '../hoc/withIncomeQuery';
import withSavingsQuery from '../hoc/withSavingsQuery';

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
  const { expenses, incomes, savings } = props;
  const expensePeriod = getYearAndMonth();
  const savingsIncomePeriod = getSavingsIncomeMonthAndYear();

  const incomesTotal = incomes.reduce(
    (acc, item) => acc + getDecimalNumber(item.amount),
    0
  );

  const budgetedExpensesTotal = expenses
    .filter(
      item =>
        item.year === expensePeriod.year && item.month === expensePeriod.month
    )
    .reduce((acc, item) => acc + getDecimalNumber(item.budget), 0);

  const actualExpensesTotal = expenses
    .filter(
      item =>
        item.year === expensePeriod.year && item.month === expensePeriod.month
    )
    .reduce((acc, item) => acc + getDecimalNumber(item.actual), 0);

  const estimatedSavingsTotal = savings
    .filter(
      item =>
        item.year === savingsIncomePeriod.year &&
        item.month === savingsIncomePeriod.month
    )
    .reduce((acc, item) => acc + getDecimalNumber(item.amount), 0);

  const actualSavingsTotal = savings
    .filter(
      item =>
        item.year === savingsIncomePeriod.year &&
        item.month === savingsIncomePeriod.month
    )
    .reduce((acc, item) => acc + getDecimalNumber(item.actual), 0);

  return (
    <Layout>
      <StyledHeading>Summary (February) - Estimated</StyledHeading>
      <TableContainer>
        <Table.Table>
          <tbody>
            <tr>
              <Th>Income (January)</Th>
              <Td>{formatter.format(incomesTotal)}</Td>
            </tr>
            <tr>
              <Th>Estimated Expenses</Th>
              <Td>{formatter.format(budgetedExpensesTotal)}</Td>
            </tr>
            <tr>
              <Th>Savings (January)</Th>
              <Td>{formatter.format(estimatedSavingsTotal)}</Td>
            </tr>
            <tr>
              <Th>Bank Balance</Th>
              <Td>
                {formatter.format(
                  incomesTotal - budgetedExpensesTotal - estimatedSavingsTotal
                )}
              </Td>
            </tr>
            <tr>
              <Th>Savings Balance</Th>
              <Td>
                {formatter.format(INITIAL_MONEY_SAVED + estimatedSavingsTotal)}
              </Td>
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
              <Td>{formatter.format(actualExpensesTotal)}</Td>
            </tr>
            <tr>
              <Th>Budget (Actual Savings)</Th>
              <Td>{formatter.format(actualSavingsTotal)}</Td>
            </tr>
            <tr>
              <Th>Bank Balance</Th>
              <Td>
                {formatter.format(
                  incomesTotal - actualExpensesTotal - actualSavingsTotal
                )}
              </Td>
            </tr>
            <tr>
              <Th>Savings Balance</Th>
              <Td>
                {formatter.format(INITIAL_MONEY_SAVED + actualSavingsTotal)}
              </Td>
            </tr>
          </tbody>
        </Table.Table>
      </TableContainer>
    </Layout>
  );
};

Home.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  incomes: PropTypes.instanceOf(Array).isRequired,
  savings: PropTypes.instanceOf(Array).isRequired
};

export default compose(
  withRouter,
  withExpenseQuery,
  withIncomeQuery,
  withSavingsQuery
)(Home);
