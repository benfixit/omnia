/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import Layout from './Layout';
import { Table } from '../styles';
import { formatter, getDecimalNumber } from '../utils/money';
import {
  getYearAndMonth,
  getSavingsIncomeMonthAndYear,
  getMonthName,
  getSavingsIncomeMonthName
} from '../utils/date';
import { toCapitalize } from '../utils/string';
import { INITIAL_MONEY_SAVED, MONEY_LENT_OUT } from '../utils/constants';
import withExpenseQuery from '../hoc/withExpenseQuery';
import withIncomeQuery from '../hoc/withIncomeQuery';
import withSavingsQuery from '../hoc/withSavingsQuery';
import withChargeQuery from '../hoc/withChargeQuery';
import withInvestmentsQuery from '../hoc/withInvestmentQuery';

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
  const { expenses, incomes, savings, charges, investments } = props;
  const expensePeriod = getYearAndMonth();
  const savingsIncomePeriod = getSavingsIncomeMonthAndYear();
  // const chargesPeriod = savingsIncomePeriod;
  const monthName = compose(toCapitalize, getMonthName)();
  const savingsIncomeMonthName = compose(
    toCapitalize,
    getSavingsIncomeMonthName
  )();

  const incomesTotal = incomes
    .filter(
      item =>
        item.year >= savingsIncomePeriod.year &&
        item.month >= savingsIncomePeriod.month
    )
    .reduce((acc, item) => acc + getDecimalNumber(item.amount), 0);

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

  const estimatedSavingsForTheMonthTillDate = savings
    .filter(
      item =>
        item.year >= savingsIncomePeriod.year &&
        item.month >= savingsIncomePeriod.month
    )
    .reduce((acc, item) => acc + getDecimalNumber(item.amount), 0);

  const actualSavingsForTheMonthTillDate = savings
    .filter(
      item =>
        item.year >= savingsIncomePeriod.year &&
        item.month >= savingsIncomePeriod.month
    )
    .reduce((acc, item) => acc + getDecimalNumber(item.actual), 0);

  const totalSavingsChargesForTheMonthTillDate = charges
    .filter(
      item =>
        item.type._id === '5e88ab6da5ae38e9f338e8fe' &&
        item.year >= savingsIncomePeriod.year &&
        item.month >= savingsIncomePeriod.month
    )
    .reduce((acc, item) => acc + getDecimalNumber(item.amount), 0);

  const totalExpensesChargesForTheMonthTillDate = charges
    .filter(
      item =>
        item.type._id === '5e88ab48a5ae38e9f338e8fd' &&
        item.year >= savingsIncomePeriod.year &&
        item.month >= savingsIncomePeriod.month
    )
    .reduce((acc, item) => acc + getDecimalNumber(item.amount), 0);

  const estimatedSavingsTotal = savings.reduce(
    (acc, item) => acc + getDecimalNumber(item.amount),
    0
  );

  const actualSavingsTotal = savings.reduce(
    (acc, item) => acc + getDecimalNumber(item.actual),
    0
  );

  const totalSavingsCharges = charges
    .filter(item => item.type._id === '5e88ab6da5ae38e9f338e8fe')
    .reduce((acc, item) => acc + getDecimalNumber(item.amount), 0);

  const investmentsTotal = investments.reduce(
    (acc, item) => acc + getDecimalNumber(item.amount),
    0
  );

  // const totalChargesForTheMonthTillDate = charges
  //   .filter(
  //     item =>
  //       item.year >= chargesPeriod.year && item.month >= chargesPeriod.month
  //   )
  //   .reduce((acc, item) => acc + getDecimalNumber(item.amount), 0);

  return (
    <Layout>
      <StyledHeading>Summary ({monthName}) - Estimated</StyledHeading>
      <TableContainer>
        <Table.Table>
          <tbody>
            <tr>
              <Th>Income: {savingsIncomeMonthName} till date</Th>
              <Td>{formatter.format(incomesTotal)}</Td>
            </tr>
            <tr>
              <Th>Expenses: ({savingsIncomeMonthName})</Th>
              <Td>{formatter.format(budgetedExpensesTotal)}</Td>
            </tr>
            <tr>
              <Th>Savings: {savingsIncomeMonthName} till date</Th>
              <Td>{formatter.format(estimatedSavingsForTheMonthTillDate)}</Td>
            </tr>
            <tr>
              <Th>Bank Balance</Th>
              <Td>
                {formatter.format(
                  incomesTotal -
                    budgetedExpensesTotal -
                    estimatedSavingsForTheMonthTillDate
                )}
              </Td>
            </tr>
            <tr>
              <Th>Savings Balance</Th>
              <Td>
                {formatter.format(
                  INITIAL_MONEY_SAVED + estimatedSavingsTotal - investmentsTotal
                )}
              </Td>
            </tr>
          </tbody>
        </Table.Table>
      </TableContainer>
      <StyledHeading>Summary ({monthName}) - Actual</StyledHeading>
      <TableContainer>
        <Table.Table>
          <tbody>
            <tr>
              <Th>Income: {savingsIncomeMonthName} till date</Th>
              <Td>{formatter.format(incomesTotal)}</Td>
            </tr>
            <tr>
              <Th>Expenses: {savingsIncomeMonthName}</Th>
              <Td>{formatter.format(actualExpensesTotal)}</Td>
            </tr>
            <tr>
              <Th>Savings: {savingsIncomeMonthName} till date</Th>
              <Td>{formatter.format(actualSavingsForTheMonthTillDate)}</Td>
            </tr>
            <tr>
              <Th>Expenses Charges: {savingsIncomeMonthName} till date</Th>
              <Td>
                {formatter.format(totalExpensesChargesForTheMonthTillDate)}
              </Td>
            </tr>
            <tr>
              <Th>Bank Balance</Th>
              <Td>
                {formatter.format(
                  incomesTotal -
                    actualExpensesTotal -
                    actualSavingsForTheMonthTillDate -
                    totalExpensesChargesForTheMonthTillDate
                )}
              </Td>
            </tr>
            <tr>
              <Th>Savings Charges: {savingsIncomeMonthName} till date</Th>
              <Td>
                {formatter.format(totalSavingsChargesForTheMonthTillDate)}
              </Td>
            </tr>
            <tr>
              <Th>Savings Balance</Th>
              <Td>
                {formatter.format(
                  INITIAL_MONEY_SAVED +
                    actualSavingsTotal -
                    totalSavingsCharges -
                    investmentsTotal -
                    MONEY_LENT_OUT
                )}
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
  savings: PropTypes.instanceOf(Array).isRequired,
  charges: PropTypes.instanceOf(Array).isRequired,
  investments: PropTypes.instanceOf(Array).isRequired
};

export default compose(
  withRouter,
  withExpenseQuery,
  withIncomeQuery,
  withSavingsQuery,
  withChargeQuery,
  withInvestmentsQuery
)(Home);
