import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { addTransaction as actionAddTransaction } from '../actions';
import Layout from './Layout';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { Layout as LayoutStyle, Table, Heading } from '../styles';

const TransactionsRow = styled(LayoutStyle.Row)`
  justify-content: center;
  padding: 15px 10px;
`;

const schema = Yup.object().shape({
  description: Yup.string()
    .min(3, 'Too short!')
    .required('Required'),
  amount: Yup.number().required('Required'),
  date: Yup.date()
    .required('Required')
    .default(() => {
      return new Date();
    }),
  category: Yup.string().required('Required')
});

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      date: JSON.stringify(new Date()).slice(1, 11),
      description: '',
      category: ['Food', 'Church', 'Transport']
    };
  }

  handleSubmit = values => {
    const { addTransaction } = this.props;
    addTransaction(values);
  };

  render() {
    const { description, category, amount, date } = this.state;
    const { transactions } = this.props;
    const { handleSubmit } = this;
    return (
      <Layout>
        <TransactionsRow>
          <Heading.H1>Transactions</Heading.H1>
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
                return (
                  <tr key={v4()}>
                    <Table.Td>{transaction.date}</Table.Td>
                    <Table.Td>{transaction.description}</Table.Td>
                    <Table.Td>{transaction.category}</Table.Td>
                    <Table.Td>{transaction.amount}</Table.Td>
                  </tr>
                );
              })}
            </tbody>
          </Table.Table>
        </TransactionsRow>
        <TransactionsRow>
          <Formik
            initialValues={{
              description,
              amount,
              category: category[0],
              date
            }}
            validationSchema={schema}
            onSubmit={(values, actions) => {
              handleSubmit(values);
              actions.setSubmitting(false);
            }}
            render={({ isSubmitting }) => (
              <Form>
                <Field
                  name="description"
                  placeholder="Enter Description"
                  component={Input}
                />
                <Field type="number" name="amount" component={Input} />
                <Field type="date" name="date" component={Input} />
                <Field
                  name="category"
                  component={Select}
                  placeholder="Select Category"
                  options={category}
                />
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          />
        </TransactionsRow>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTransaction: payload => dispatch(actionAddTransaction(payload))
  };
};

Transactions.propTypes = {
  transactions: PropTypes.instanceOf(Array),
  addTransaction: PropTypes.func.isRequired
};

Transactions.defaultProps = {
  transactions: []
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
