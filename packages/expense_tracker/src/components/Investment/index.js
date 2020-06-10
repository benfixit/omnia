import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import Modal from './Modal';
import Table from './Table';
import Layout from '../Layout';
import { Layout as LayoutStyle, StyledHeading } from '../../styles';
import { monthsOfYear, getDate, getYearAndMonthText } from '../../utils/date';
import { setDecimalNumber } from '../../utils/money';
import { ADD_INVESTMENT, GET_INVESTMENTS } from '../../graphql/investments';
import withInvestmentsQuery from '../../hoc/withInvestmentQuery';

const { Pane } = Picasso;

const InvestmentsRow = styled(Pane)`
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

class Investments extends Component {
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

  handleChange = event => {
    const { data } = this.state;
    const {
      target: { name, value }
    } = event;
    this.setState({
      data: { ...data, [name]: value }
    });
  };

  handleSubmit = (event, toggle) => {
    event.preventDefault();
    const {
      data: { date, description, amount, type }
    } = this.state;

    const investmentDate = new Date(date);
    const { mutate, history } = this.props;
    const period = getYearAndMonthText();
    mutate({
      variables: {
        amount: setDecimalNumber(amount),
        description,
        year: Number(investmentDate.getFullYear()),
        month: Number(investmentDate.getMonth()),
        day: Number(investmentDate.getDate()),
        type
      },
      refetchQueries: [
        {
          query: GET_INVESTMENTS
        }
      ]
    }).then(() => {
      toggle();
      history.push(`/investments/${period.year}/${period.month}`);
    });
  };

  render() {
    const { data } = this.state;
    const { handleChange, handleSubmit } = this;
    const {
      match: { url },
      investments
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
        <InvestmentsRow>
          <StyledHeading>Investments</StyledHeading>
          <Modal
            data={data}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </InvestmentsRow>
        <Table investments={investments} />
      </Layout>
    );
  }
}

Investments.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired,
  investments: PropTypes.instanceOf(Array).isRequired,
  mutate: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default compose(
  withRouter,
  graphql(ADD_INVESTMENT),
  withInvestmentsQuery
)(Investments);
