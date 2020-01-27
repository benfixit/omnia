import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import compose from 'lodash/fp/compose';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import Picasso from '@omnia/picasso';

import client from '../../apollo/client';
import { FormButton, StyledForm } from '../../styles';
import { EDIT_INCOME, GET_INCOME } from '../../graphql/incomes';
import { getDate } from '../../utils/date';
import { getDecimalNumber, setDecimalNumber } from '../../utils/money';

const { DateField, InputField, Pane } = Picasso;

const Container = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

class EditIncome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeData: {
        amount: '0',
        description: '',
        date: getDate()
      }
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    client
      .query({
        query: GET_INCOME,
        variables: { _id: id }
      })
      .then(response => {
        const { incomeData } = this.state;
        const { income } = response.data;
        this.setState({
          incomeData: {
            ...incomeData,
            amount: getDecimalNumber(income.amount),
            description: income.description,
            date: getDate(income.year, income.month, income.day)
          }
        });
      });
  }

  handleChange = event => {
    const { incomeData } = this.state;
    const {
      target: { name, value }
    } = event;
    this.setState({
      incomeData: { ...incomeData, [name]: value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      incomeData: { amount, description, date }
    } = this.state;
    const incomeDate = new Date(date);
    const {
      mutate,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    mutate({
      variables: {
        _id: id,
        amount: setDecimalNumber(amount),
        description,
        year: Number(incomeDate.getFullYear()),
        month: Number(incomeDate.getMonth()),
        day: Number(incomeDate.getDate())
      }
    }).then(() => history.push('/incomes'));
  };

  render() {
    const {
      incomeData: { amount, description, date }
    } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <InputField
            name="amount"
            value={amount}
            onChange={handleChange}
            label="Amount"
          />
          <InputField
            name="description"
            value={description}
            onChange={handleChange}
            label="Description"
          />
          <DateField
            name="date"
            value={date}
            onChange={handleChange}
            label="period"
          />
          <FormButton type="submit">Submit</FormButton>
        </StyledForm>
      </Container>
    );
  }
}

EditIncome.propTypes = {
  mutate: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

EditIncome.defaultProps = {
  mutate: () => {}
};

export default compose(withRouter, graphql(EDIT_INCOME))(EditIncome);
