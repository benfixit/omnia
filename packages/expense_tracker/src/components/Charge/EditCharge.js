import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import compose from 'lodash/fp/compose';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import Picasso from '@omnia/picasso';

import client from '../../apollo/client';
import { FormButton, StyledForm } from '../../styles';
import { EDIT_CHARGE, GET_CHARGE } from '../../graphql/charges';
import { getDate, getYearAndMonthText } from '../../utils/date';
import { getDecimalNumber, setDecimalNumber } from '../../utils/money';
import withChargeTypeQuery from '../../hoc/withChargeTypeQuery';

const { DateField, InputField, Pane, SelectField } = Picasso;

const Container = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

class EditCharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        amount: '0',
        description: '',
        date: getDate(),
        type: ''
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
        query: GET_CHARGE,
        variables: { _id: id }
      })
      .then(response => {
        const { data } = this.state;
        const { charge } = response.data;
        const {
          type: { _id: typeId }
        } = charge;
        this.setState({
          data: {
            ...data,
            amount: getDecimalNumber(charge.amount),
            description: charge.description,
            type: typeId,
            date: getDate(charge.year, charge.month, charge.day)
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
      data: { amount, description, date, type }
    } = this.state;
    const chargeDate = new Date(date);
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
        type,
        year: Number(chargeDate.getFullYear()),
        month: Number(chargeDate.getMonth()),
        day: Number(chargeDate.getDate())
      }
    }).then(() => history.push(`/charges/${period.year}/${period.month}`));
  };

  render() {
    const {
      data: { amount, description, date, type }
    } = this.state;
    const { chargeTypes: types } = this.props;
    const { handleChange, handleSubmit } = this;
    return (
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <SelectField
            name="type"
            onChange={handleChange}
            value={type}
            label="Type"
          >
            <option value="">Select a type</option>
            {types.map(item => {
              const { _id: id, title } = item;
              return (
                <option value={id} key={id}>
                  {title}
                </option>
              );
            })}
          </SelectField>
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

EditCharge.propTypes = {
  mutate: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  chargeTypes: PropTypes.instanceOf(Array).isRequired
};

EditCharge.defaultProps = {
  mutate: () => {}
};

export default compose(
  withRouter,
  graphql(EDIT_CHARGE),
  withChargeTypeQuery
)(EditCharge);
