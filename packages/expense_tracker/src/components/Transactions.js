import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { v4 } from 'uuid';
import { graphql } from 'react-apollo';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import withCategoryQuery from '../hoc/withCategoryQuery';
import withTransactionQuery from '../hoc/withTransactionQuery';
import { ADD_TRANSACTION, GET_TRANSACTIONS } from '../graphql/transactions';
import { formatter } from '../utils/money';
import Layout from './Layout';
import {
  Layout as LayoutStyle,
  Table,
  StyledForm,
  FormButton,
  StyledButton,
  StyledHeading
} from '../styles';

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
    const { categories, transactions } = this.props;
    return (
      <Layout>
        <TransactionsRow>
          <StyledHeading>Transactions</StyledHeading>
          <StyledButton onClick={handleOpenModal}>Add Transaction</StyledButton>
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
              {transactions.map(transaction => {
                const transactionDate = new Date(Number(transaction.createdAt));
                return (
                  <tr key={v4()}>
                    <Table.Td>{transactionDate.toLocaleDateString()}</Table.Td>
                    <Table.Td>{transaction.description}</Table.Td>
                    <Table.Td>{transaction.category.title}</Table.Td>
                    <Table.Td>{formatter.format(transaction.amount)}</Table.Td>
                  </tr>
                );
              })}
            </tbody>
          </Table.Table>
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
      </Layout>
    );
  }
}

Transactions.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  transactions: PropTypes.instanceOf(Array).isRequired,
  mutate: PropTypes.func
};

Transactions.defaultProps = {
  mutate: () => {}
};

export default compose(
  withRouter,
  graphql(ADD_TRANSACTION),
  withCategoryQuery,
  withTransactionQuery
)(Transactions);
