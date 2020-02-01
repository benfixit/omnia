import React from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import { Table } from '../../styles';
import { formatter, getDecimalNumber } from '../../utils/money';
import { DELETE_EXPENSE, GET_EXPENSES } from '../../graphql/expenses';

const { Dialog, Label, Link, Pane, Text } = Picasso;

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

const ActionTableColumn = styled(Table.Td)`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const DeleteLabel = styled(Label)`
  cursor: pointer;
`;

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      targetExpense: null
    };
  }

  handleOpenDeleteDialog = expenseId => {
    this.setState({
      showDialog: true,
      targetExpense: expenseId
    });
  };

  handleCloseDeleteDialog = () => {
    this.setState({
      showDialog: false
    });
  };

  deleteExpense = () => {
    const { targetExpense } = this.state;
    const { mutate, history } = this.props;
    mutate({
      variables: {
        _id: targetExpense
      },
      refetchQueries: [
        {
          query: GET_EXPENSES
        }
      ]
    }).then(() => history.push('/expenses'));
  };

  render() {
    const { expenses } = this.props;
    const { showDialog } = this.state;
    const {
      handleOpenDeleteDialog,
      handleCloseDeleteDialog,
      deleteExpense
    } = this;

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
                  <ActionTableColumn>
                    <Link href={`/expenses/edit/${expenseId}`}>Edit</Link>
                    <DeleteLabel
                      variant="danger"
                      onClick={() => handleOpenDeleteDialog(expenseId)}
                    >
                      Delete
                    </DeleteLabel>
                  </ActionTableColumn>
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
        <Dialog show={showDialog}>
          <Dialog.Header title="Delete Expense" />
          <Dialog.Content>
            <Text>Are you sure you want to delete this expense?</Text>
          </Dialog.Content>
          <Dialog.Action
            onCancel={handleCloseDeleteDialog}
            onOk={deleteExpense}
          />
        </Dialog>
      </TableContainer>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  mutate: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default compose(withRouter, graphql(DELETE_EXPENSE))(ExpenseTable);
