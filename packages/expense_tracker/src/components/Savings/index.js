import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import SavingModal from './SavingsModal';
import SavingsTable from './SavingsTable';
import Layout from '../Layout';
import {
  Layout as LayoutStyle,
  StyledButton,
  StyledHeading
} from '../../styles';
import { monthsOfYear, getDate } from '../../utils/date';
import { setDecimalNumber } from '../../utils/money';
import { ADD_SAVING, GET_SAVINGS } from '../../graphql/savings';
import withSavingsQuery from '../../hoc/withSavingsQuery';

const { Pane } = Picasso;

const SavingsRow = styled(Pane)`
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

class Savings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        amount: '0',
        description: '',
        date: getDate()
      },
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
      data: { date, description, amount }
    } = this.state;

    const savingsDate = new Date(date);
    const { mutate } = this.props;
    mutate({
      variables: {
        amount: setDecimalNumber(amount),
        description,
        year: Number(savingsDate.getFullYear()),
        month: Number(savingsDate.getMonth()),
        day: Number(savingsDate.getDate())
      },
      refetchQueries: [
        {
          query: GET_SAVINGS
        }
      ]
    });
  };

  render() {
    const { data, showModal } = this.state;
    const {
      handleChange,
      handleSubmit,
      handleOpenModal,
      handleCloseModal
    } = this;
    const {
      match: { url },
      savings
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
        <SavingsRow>
          <StyledHeading>Savings</StyledHeading>
          <StyledButton onClick={handleOpenModal}>Add Savings</StyledButton>
        </SavingsRow>
        <SavingsTable savings={savings} />
        <SavingModal
          showModal={showModal}
          data={data}
          handleChange={handleChange}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      </Layout>
    );
  }
}

Savings.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired,
  savings: PropTypes.instanceOf(Array).isRequired,
  mutate: PropTypes.func
};

Savings.defaultProps = {
  mutate: () => {}
};

export default compose(
  withRouter,
  graphql(ADD_SAVING),
  withSavingsQuery
)(Savings);
