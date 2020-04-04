import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import compose from 'lodash/fp/compose';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import Picasso from '@omnia/picasso';

import client from '../../apollo/client';
import { FormButton, StyledForm } from '../../styles';
import { EDIT_SAVING, GET_SAVING } from '../../graphql/savings';
import { getDate, getYearAndMonthText } from '../../utils/date';
import { getDecimalNumber, setDecimalNumber } from '../../utils/money';

const { DateField, InputField, Pane } = Picasso;

const Container = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

class EditSavings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        amount: '0',
        actual: '0',
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
        query: GET_SAVING,
        variables: { _id: id }
      })
      .then(response => {
        const { data } = this.state;
        const { saving } = response.data;
        this.setState({
          data: {
            ...data,
            amount: getDecimalNumber(saving.amount),
            actual: getDecimalNumber(saving.actual),
            description: saving.description,
            date: getDate(saving.year, saving.month, saving.day)
          }
        });
      });
  }

  handleChange = event => {
    const { data } = this.state;
    const {
      target: { name, value }
    } = event;
    this.setState({
      data: { ...data, [name]: value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      data: { amount, actual, description, date }
    } = this.state;
    const savingsDate = new Date(date);
    const {
      mutate,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    const period = getYearAndMonthText();
    mutate({
      variables: {
        _id: id,
        amount: setDecimalNumber(amount),
        actual: setDecimalNumber(actual),
        description,
        year: Number(savingsDate.getFullYear()),
        month: Number(savingsDate.getMonth()),
        day: Number(savingsDate.getDate())
      }
    }).then(() => history.push(`/savings/${period.year}/${period.month}`));
  };

  render() {
    const {
      data: { amount, actual, description, date }
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
            name="actual"
            value={actual}
            onChange={handleChange}
            label="Actual"
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

EditSavings.propTypes = {
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

EditSavings.defaultProps = {
  mutate: () => {}
};

export default compose(withRouter, graphql(EDIT_SAVING))(EditSavings);
