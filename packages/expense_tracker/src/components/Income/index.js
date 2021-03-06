import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import IncomeModal from './IncomeModal';
import IncomeTable from './IncomeTable';
import Layout from '../Layout';
import { Layout as LayoutStyle, StyledHeading } from '../../styles';
import { monthsOfYear, getDate, getYearAndMonthText } from '../../utils/date';
import { setDecimalNumber } from '../../utils/money';
import { ADD_INCOME, GET_INCOMES } from '../../graphql/incomes';
import withIncomeQuery from '../../hoc/withIncomeQuery';

const { Pane } = Picasso;

const IncomesRow = styled(Pane)`
  justify-content: space-between;
  padding: 14px 30px;
`;

const LowerNavRow = styled(LayoutStyle.Row)`
  padding: 14px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const NavLink = styled(Link)`
  padding: 0 5px;
  margin: 0 10px;
  text-decoration: none;
  color: white;
`;

const LowerNavLink = styled(NavLink)`
  color: #a09280;
`;

const NavUl = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeObject: {
        amount: '0',
        description: '',
        date: getDate()
      }
    };
  }

  handleChange = event => {
    const { incomeObject } = this.state;
    const {
      target: { name, value }
    } = event;
    this.setState({
      incomeObject: { ...incomeObject, [name]: value }
    });
  };

  handleSubmit = (event, toggle) => {
    event.preventDefault();
    const {
      incomeObject: { date, description, amount }
    } = this.state;

    const incomeDate = new Date(date);
    const { mutate, history } = this.props;
    const period = getYearAndMonthText();
    mutate({
      variables: {
        amount: setDecimalNumber(amount),
        description,
        year: Number(incomeDate.getFullYear()),
        month: Number(incomeDate.getMonth()),
        day: Number(incomeDate.getDate())
      },
      refetchQueries: [
        {
          query: GET_INCOMES
        }
      ]
    }).then(() => {
      toggle();
      history.push(`/incomes/${period.year}/${period.month}`);
    });
  };

  render() {
    const { incomeObject } = this.state;
    const { handleChange, handleSubmit } = this;
    const {
      match: { url },
      incomes
    } = this.props;

    const root = url.slice(1).split('/')[0];
    return (
      <Layout>
        <LowerNavRow>
          <NavUl>
            {Object.keys(monthsOfYear).map(month => {
              const paramDate = new Date();
              return (
                <LowerNavLink
                  key={v4()}
                  to={`/${root}/${paramDate.getFullYear()}/${month.toLowerCase()}`}
                >
                  {month}
                </LowerNavLink>
              );
            })}
          </NavUl>
        </LowerNavRow>
        <IncomesRow>
          <StyledHeading>Income</StyledHeading>
          <IncomeModal
            incomeObject={incomeObject}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </IncomesRow>
        <IncomeTable incomes={incomes} />
      </Layout>
    );
  }
}

Income.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired,
  incomes: PropTypes.instanceOf(Array).isRequired,
  mutate: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default compose(
  withRouter,
  graphql(ADD_INCOME),
  withIncomeQuery
)(Income);
