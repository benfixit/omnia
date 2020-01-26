import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { v4 } from 'uuid';
import { graphql, Query } from 'react-apollo';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';
import { GET_CATEGORIES } from '../graphql/categories';
import { GET_TRANSACTIONS, ADD_TRANSACTION } from '../graphql/transactions';
import Layout from './Layout';
import {
  Layout as LayoutStyle,
  Table,
  StyledForm,
  FormButton,
  StyledButton,
  StyledHeading
} from '../styles';
import { monthsOfYear } from '../utils/date';

const { DateField, InputField, Modal, SelectField, TextAreaField } = Picasso;

const TransactionsRow = styled(LayoutStyle.Row)`
  justify-content: space-between;
  padding: 14px 30px;
`;

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      date: JSON.stringify(new Date()).slice(1, 11),
      category: '',
      description: '',
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
    const { amount, description, category, date } = this.state;
    const transactionDate = new Date(date);
    const { mutate } = this.props;
    mutate({
      variables: {
        amount: Number(amount),
        description,
        category,
        year: transactionDate.getFullYear(),
        month: transactionDate.getMonth(),
        day: transactionDate.getDate()
      },
      refetchQueries: [
        {
          query: GET_TRANSACTIONS
        }
      ]
    });
  };

  render() {
    const { description, amount, category, date, showModal } = this.state;
    const {
      handleChange,
      handleSubmit,
      handleCloseModal,
      handleOpenModal
    } = this;
    const dateParam = new Date();
    const defaultYear = dateParam.getFullYear();
    const {
      match: {
        params: { year = defaultYear, month }
      }
    } = this.props;
    const monthIndex = monthsOfYear[month] || dateParam.getMonth();
    return (
      <Layout>
        <TransactionsRow>
          <StyledHeading>Transactions</StyledHeading>
          <StyledButton onClick={handleOpenModal}>Add Transaction</StyledButton>
        </TransactionsRow>
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
              <>
                <TransactionsRow>
                  <Query
                    query={GET_TRANSACTIONS}
                    variables={{
                      year: Number(year),
                      month: Number(monthIndex)
                    }}
                  >
                    {({
                      data: transactionsData,
                      loading: transactionsLoading,
                      error: transactionsError
                    }) => {
                      if (transactionsLoading) return <span>Loading...</span>;
                      if (transactionsError) return <span>Error :(</span>;
                      const { transactions } = transactionsData;
                      return (
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
                            {transactions.map(transaction => {
                              const transactionDate = new Date(
                                Number(transaction.createdAt)
                              );
                              return (
                                <tr key={v4()}>
                                  <Table.Td>
                                    {transactionDate.toLocaleDateString()}
                                  </Table.Td>
                                  <Table.Td>{transaction.description}</Table.Td>
                                  <Table.Td>
                                    {transaction.category.title}
                                  </Table.Td>
                                  <Table.Td>{transaction.amount}</Table.Td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table.Table>
                      );
                    }}
                  </Query>
                </TransactionsRow>
                <TransactionsRow>
                  <Modal show={showModal}>
                    <Modal.Header title="Transaction" />
                    <Modal.Content>
                      <StyledForm onSubmit={handleSubmit}>
                        <SelectField
                          name="category"
                          onChange={handleChange}
                          value={category}
                          label="Category"
                        >
                          <option value="">Select a category</option>
                          {categories.map(item => {
                            const { _id: id, title } = item;
                            return (
                              <option value={id} key={id}>
                                {title}
                              </option>
                            );
                          })}
                        </SelectField>
                        <InputField
                          type="number"
                          name="amount"
                          value={amount}
                          onChange={handleChange}
                          label="Amount"
                        />
                        <DateField
                          name="date"
                          value={date}
                          onChange={handleChange}
                          label="period"
                        />
                        <TextAreaField
                          name="description"
                          value={description}
                          onChange={handleChange}
                          label="Description"
                        />
                        <FormButton type="submit">Submit</FormButton>
                      </StyledForm>
                    </Modal.Content>
                    <Modal.Action onClose={handleCloseModal} />
                  </Modal>
                </TransactionsRow>
              </>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

Transactions.propTypes = {
  categoryList: PropTypes.shape({
    categories: PropTypes.array
  }),
  transactionList: PropTypes.shape({
    transactions: PropTypes.array
  }),
  mutate: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string,
      month: PropTypes.string
    })
  })
};

Transactions.defaultProps = {
  categoryList: {},
  transactionList: {},
  mutate: () => {},
  match: {}
};

export default compose(graphql(ADD_TRANSACTION), withRouter)(Transactions);
