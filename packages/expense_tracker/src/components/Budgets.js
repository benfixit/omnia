import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { v4 } from 'uuid';
import { graphql, Query } from 'react-apollo';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';
import { monthsOfYear } from '../utils/date';
import { GET_CATEGORIES } from '../graphql/categories';
import { ADD_BUDGET, GET_BUDGETS } from '../graphql/budgets';
import { GET_TRANSACTIONS } from '../graphql/transactions';
import Layout from './Layout';
import {
  Table,
  StyledForm,
  FormButton,
  StyledButton,
  StyledHeading
} from '../styles';

const { InputField, Modal, SelectField, Pane } = Picasso;

const BudgetsRow = styled(Pane)`
  justify-content: space-between;
  padding: 14px 30px;
`;

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

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2
});

class Budgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1000,
      category: '',
      showModal: false
    };
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  handleChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { amount, category } = this.state;
    const { mutate } = this.props;
    mutate({
      variables: {
        amount: Number(amount),
        category
      },
      refetchQueries: [
        {
          query: GET_BUDGETS
        }
      ]
    });
  };

  render() {
    const { amount, category, showModal } = this.state;
    const {
      handleChange,
      handleSubmit,
      handleOpenModal,
      handleCloseModal
    } = this;
    const date = new Date();
    const defaultYear = date.getFullYear();
    const {
      match: {
        params: { year = defaultYear, month }
      }
    } = this.props;
    const monthIndex = monthsOfYear[month] || date.getMonth();
    return (
      <Layout>
        <BudgetsRow>
          <StyledHeading>Budget</StyledHeading>
          <StyledButton onClick={handleOpenModal}>Add Budget</StyledButton>
        </BudgetsRow>
        <Query query={GET_CATEGORIES}>
          {({
            data: categoriesData,
            error: categoriesError,
            loading: categoriesLoading
          }) => {
            if (categoriesLoading) return <h2>Loading...</h2>;
            if (categoriesError) return <h2>Error :(</h2>;
            const { categories } = categoriesData;
            return (
              <Query
                query={GET_TRANSACTIONS}
                variables={{
                  year: Number(year),
                  month: Number(monthIndex)
                }}
              >
                {({
                  data: transactionsData,
                  error: transactionError,
                  loading: transactionLoading
                }) => {
                  if (transactionLoading) return <h2>Loading...</h2>;
                  if (transactionError) return <h2>Error :(</h2>;
                  const { transactions } = transactionsData;
                  const transactionsTotal = transactions.reduce(
                    (acc, item) => acc + Number(item.amount),
                    0
                  );
                  return (
                    <Query
                      query={GET_BUDGETS}
                      variables={{
                        year: Number(year),
                        month: Number(monthIndex)
                      }}
                    >
                      {({ data: budgetsData, error, loading }) => {
                        if (loading) return <h2>Loading...</h2>;
                        if (error) return <h2>Error :(</h2>;
                        const { budgets } = budgetsData;
                        const budgetsTotal = budgets.reduce(
                          (acc, item) => acc + Number(item.amount),
                          0
                        );
                        const existingBudgetCategory = budgets.reduce(
                          (acc, item) => {
                            const {
                              category: { _id: id }
                            } = item;
                            return [...acc, id];
                          },
                          []
                        );
                        const formCategories = categories.filter(item => {
                          const { _id: id } = item;
                          return !existingBudgetCategory.includes(id);
                        });
                        return (
                          <>
                            <TableContainer>
                              <Table.Table>
                                <thead>
                                  <tr>
                                    <Table.Th>Category</Table.Th>
                                    <Table.Th>Budget</Table.Th>
                                    <Table.Th>Actual</Table.Th>
                                    <Table.Th>Difference</Table.Th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {budgets.map(budget => {
                                    const actual = transactions
                                      .filter(transaction => {
                                        const {
                                          category: {
                                            _id: transactionCategoryId
                                          }
                                        } = transaction;
                                        const {
                                          category: { _id: budgetCategoryId }
                                        } = budget;
                                        return (
                                          transactionCategoryId ===
                                          budgetCategoryId
                                        );
                                      })
                                      .reduce(
                                        (acc, item) =>
                                          acc + Number(item.amount),
                                        0
                                      );

                                    const difference = budget.amount - actual;

                                    return (
                                      <tr key={v4()}>
                                        <TitleTableData>
                                          {budget.category.title}
                                        </TitleTableData>
                                        <Table.Td>
                                          {formatter.format(budget.amount)}
                                        </Table.Td>
                                        <Table.Td>
                                          {formatter.format(actual)}
                                        </Table.Td>
                                        <Table.Td
                                          status={
                                            Number(difference) > 0
                                              ? 'positive'
                                              : 'negative'
                                          }
                                        >
                                          {Number(difference) > 0
                                            ? formatter.format(
                                                Math.abs(difference)
                                              )
                                            : `(${formatter.format(
                                                Math.abs(difference)
                                              )})`}
                                        </Table.Td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <TableFooterTh>Total</TableFooterTh>
                                    <TableFooterTh>
                                      {formatter.format(budgetsTotal)}
                                    </TableFooterTh>
                                    <TableFooterTh>
                                      {formatter.format(transactionsTotal)}
                                    </TableFooterTh>
                                    <TableFooterTh>
                                      {formatter.format(
                                        budgetsTotal - transactionsTotal
                                      )}
                                    </TableFooterTh>
                                  </tr>
                                </tfoot>
                              </Table.Table>
                            </TableContainer>
                            <Modal show={showModal}>
                              <Modal.Header title="Budget" />
                              <Modal.Content>
                                <StyledForm onSubmit={handleSubmit}>
                                  <Pane>
                                    <SelectField
                                      name="category"
                                      onChange={handleChange}
                                      value={category}
                                      label="Category"
                                    >
                                      <option value="">
                                        Select a category
                                      </option>
                                      {formCategories.map(item => {
                                        const { _id: id, title } = item;
                                        return (
                                          <option value={id} key={id}>
                                            {title}
                                          </option>
                                        );
                                      })}
                                    </SelectField>
                                  </Pane>
                                  <InputField
                                    name="amount"
                                    value={amount}
                                    onChange={handleChange}
                                    label="Amount"
                                  />
                                  <FormButton type="submit">Submit</FormButton>
                                </StyledForm>
                              </Modal.Content>
                              <Modal.Action onClose={handleCloseModal} />
                            </Modal>
                          </>
                        );
                      }}
                    </Query>
                  );
                }}
              </Query>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

Budgets.propTypes = {
  categoryList: PropTypes.shape({
    categories: PropTypes.array
  }),
  budgetList: PropTypes.shape({
    budgets: PropTypes.array
  }),
  transactionList: PropTypes.shape({
    transactions: PropTypes.array
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string,
      month: PropTypes.string
    })
  }),
  mutate: PropTypes.func
};

Budgets.defaultProps = {
  categoryList: {},
  budgetList: {},
  transactionList: {},
  match: {},
  mutate: () => {}
};

export default compose(graphql(ADD_BUDGET), withRouter)(Budgets);
