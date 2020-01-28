import React from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Picasso from '@omnia/picasso';

import { Table } from '../../styles';
import { formatter, getDecimalNumber } from '../../utils/money';

const { Pane } = Picasso;

const TableContainer = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

const TitleTableData = styled(Table.Td)`
  text-align: left;
`;

const TableFooterTh = styled(Table.Th)`
  text-align: right;
  background-color: white;
  color: #000000;
`;

const ExpenseTable = props => {
  const { expenses } = props;

  const actualExpensesTotal = expenses.reduce(
    (acc, item) => acc + getDecimalNumber(item.actual),
    0
  );

  const budgetedExpensesTotal = expenses.reduce(
    (acc, item) => acc + getDecimalNumber(item.budget),
    0
  );

  return (
    <TableContainer>
      <Table.Table>
        <thead>
          <tr>
            <Table.Th>Description</Table.Th>
            <Table.Th>Budget</Table.Th>
            <Table.Th>Actual</Table.Th>
            <Table.Th>Difference</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Action</Table.Th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => {
            const budgetedExpense = getDecimalNumber(expense.budget);
            const actualExpense = getDecimalNumber(expense.actual);
            const difference = budgetedExpense - actualExpense;
            const { _id: expenseId } = expense;

            return (
              <tr key={v4()}>
                <TitleTableData>{expense.description}</TitleTableData>
                <Table.Td>{formatter.format(budgetedExpense)}</Table.Td>
                <Table.Td>{formatter.format(actualExpense)}</Table.Td>
                <Table.Td
                  status={Number(difference) > 0 ? 'positive' : 'negative'}
                >
                  {Number(difference) > 0
                    ? formatter.format(Math.abs(difference))
                    : `(${formatter.format(Math.abs(difference))})`}
                </Table.Td>
                <Table.Td>{expense.category.title}</Table.Td>
                <Table.Td>
                  <Link to={`/expenses/edit/${expenseId}`}>Edit</Link>
                </Table.Td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableFooterTh>Total</TableFooterTh>
            <TableFooterTh>
              {formatter.format(budgetedExpensesTotal)}
            </TableFooterTh>
            <TableFooterTh>
              {formatter.format(actualExpensesTotal)}
            </TableFooterTh>
            <TableFooterTh>
              {formatter.format(budgetedExpensesTotal - actualExpensesTotal)}
            </TableFooterTh>
            <TableFooterTh />
            <TableFooterTh />
          </tr>
        </tfoot>
      </Table.Table>
    </TableContainer>
  );
};

ExpenseTable.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired
};

export default ExpenseTable;
