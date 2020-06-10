import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import compose from 'lodash/fp/compose';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import Picasso from '@omnia/picasso';

import client from '../../apollo/client';
import { FormButton, StyledForm } from '../../styles';
import { EDIT_INVESTMENT, GET_INVESTMENT } from '../../graphql/investments';
import { getDate, getYearAndMonthText } from '../../utils/date';
import { getDecimalNumber, setDecimalNumber } from '../../utils/money';

const { DateField, InputField, Pane } = Picasso;

const Container = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

class EditInvestments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
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
        query: GET_INVESTMENT,
        variables: { _id: id }
      })
      .then(response => {
        const { data } = this.state;
        const { investment } = response.data;
        this.setState({
          data: {
            ...data,
            amount: getDecimalNumber(investment.amount),
            description: investment.description,
            date: getDate(investment.year, investment.month, investment.day)
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
      data: { amount, description, date }
    } = this.state;
    const investmentDate = new Date(date);
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
        description,
        year: Number(investmentDate.getFullYear()),
        month: Number(investmentDate.getMonth()),
        day: Number(investmentDate.getDate())
      }
    }).then(() => history.push(`/investments/${period.year}/${period.month}`));
  };

  render() {
    const {
      data: { amount, description, date }
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

EditInvestments.propTypes = {
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

EditInvestments.defaultProps = {
  mutate: () => {}
};

export default compose(withRouter, graphql(EDIT_INVESTMENT))(EditInvestments);
