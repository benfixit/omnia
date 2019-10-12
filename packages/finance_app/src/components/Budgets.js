import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { addBudget as actionAddBudget } from '../actions';
import Layout from './Layout';
import Button from './Button';
import Input from './Input';
import { Layout as LayoutStyle, Table, Heading } from '../styles';

const BudgetsRow = styled(LayoutStyle.Row)`
  justify-content: center;
  padding: 15px 10px;
`;

const schema = Yup.object().shape({
  category: Yup.string()
    .required('Required')
    .min(2, 'Please use a descriptive title'),
  budget: Yup.number()
    .required('Required')
    .min(0, 'Please enter a budget')
});

class Budgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Food',
      budget: 1000
    };
  }

  handleSubmit = values => {
    const { addBudget } = this.props;
    console.log('Values::: ', values);
    addBudget(values);
  };

  render() {
    const { category, budget } = this.state;
    const { budgets } = this.props;
    const { handleSubmit } = this;
    return (
      <Layout>
        <BudgetsRow>
          <Heading.H1>Budget</Heading.H1>
        </BudgetsRow>
        <BudgetsRow>
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
              {budgets.map(item => {
                return (
                  <tr key={v4()}>
                    <Table.Td>{item.category}</Table.Td>
                    <Table.Td>{item.budget}</Table.Td>
                    <Table.Td>{item.actual}</Table.Td>
                    <Table.Td>{item.difference}</Table.Td>
                  </tr>
                );
              })}
            </tbody>
          </Table.Table>
        </BudgetsRow>
        <BudgetsRow>
          <Formik
            initialValues={{ category, budget }}
            onSubmit={(values, actions) => {
              handleSubmit(values);
              actions.setSubmitting(false);
            }}
            validationSchema={schema}
            render={({ isSubmitting }) => (
              <Form>
                <Field
                  name="category"
                  placeholder="Enter Description"
                  component={Input}
                />
                <Field type="number" name="budget" component={Input} />
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          />
        </BudgetsRow>
      </Layout>
    );
  }
}

Budgets.propTypes = {
  budgets: PropTypes.instanceOf(Array),
  addBudget: PropTypes.func.isRequired
};

Budgets.defaultProps = {
  budgets: []
};

const mapStateToProps = state => {
  return {
    budgets: state.budgets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addBudget: payload => dispatch(actionAddBudget(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Budgets);
