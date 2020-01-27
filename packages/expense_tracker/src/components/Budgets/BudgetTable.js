import React from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Picasso from '@omnia/picasso';

import { Table } from '../../styles';
import { formatter } from '../../utils/money';

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

const BudgetTable = props => {
  const { budgets } = props;

  const expensesTotal = budgets.reduce(
    (acc, item) => acc + Number(item.actual),
    0
  );

  const budgetsTotal = budgets.reduce(
    (acc, item) => acc + Number(item.budget),
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
          {budgets.map(budget => {
            const difference = budget.budget - budget.actual;
            const { _id: budgetId } = budget;

            return (
              <tr key={v4()}>
                <TitleTableData>{budget.description}</TitleTableData>
                <Table.Td>{formatter.format(budget.budget)}</Table.Td>
                <Table.Td>{formatter.format(budget.actual)}</Table.Td>
                <Table.Td
                  status={Number(difference) > 0 ? 'positive' : 'negative'}
                >
                  {Number(difference) > 0
                    ? formatter.format(Math.abs(difference))
                    : `(${formatter.format(Math.abs(difference))})`}
                </Table.Td>
                <Table.Td>{budget.category.title}</Table.Td>
                <Table.Td>
                  <Link to={`/budgets/edit/${budgetId}`}>Edit</Link>
                </Table.Td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableFooterTh>Total</TableFooterTh>
            <TableFooterTh>{formatter.format(budgetsTotal)}</TableFooterTh>
            <TableFooterTh>{formatter.format(expensesTotal)}</TableFooterTh>
            <TableFooterTh>
              {formatter.format(budgetsTotal - expensesTotal)}
            </TableFooterTh>
            <TableFooterTh />
            <TableFooterTh />
          </tr>
        </tfoot>
      </Table.Table>
    </TableContainer>
  );
};

BudgetTable.propTypes = {
  budgets: PropTypes.instanceOf(Array).isRequired
};

export default BudgetTable;
