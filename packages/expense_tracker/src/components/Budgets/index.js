import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import BudgetModal from './BudgetModal';
import BudgetTable from './BudgetTable';

import withCategoryQuery from '../../hoc/withCategoryQuery';
import withBudgetQuery from '../../hoc/withBudgetQuery';
import { ADD_BUDGET, GET_BUDGETS } from '../../graphql/budgets';
import Layout from '../Layout';
import {
  Layout as LayoutStyle,
  StyledButton,
  StyledHeading
} from '../../styles';
import { monthsOfYear, getDate } from '../../utils/date';

const { Pane } = Picasso;

const BudgetsRow = styled(Pane)`
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

class Budgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetObject: {
        budget: '0',
        actual: '0',
        description: '',
        date: getDate(),
        category: ''
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
    const { budgetObject } = this.state;
    const {
      target: { name, value }
    } = event;
    this.setState({
      budgetObject: { ...budgetObject, [name]: value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      budgetObject: { date, budget, actual, description, category }
    } = this.state;
    const budgetDate = new Date(date);
    const { mutate } = this.props;
    mutate({
      variables: {
        budget: Number(budget),
        actual: Number(actual),
        description,
        category,
        year: Number(budgetDate.getFullYear()),
        month: Number(budgetDate.getMonth()),
        day: Number(budgetDate.getDate())
      },
      refetchQueries: [
        {
          query: GET_BUDGETS
        }
      ]
    });
  };

  render() {
    const { budgetObject, showModal } = this.state;
    const {
      handleChange,
      handleSubmit,
      handleOpenModal,
      handleCloseModal
    } = this;
    const {
      categories,
      budgets,
      match: { url }
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
        <BudgetsRow>
          <StyledHeading>Budget</StyledHeading>
          <StyledButton onClick={handleOpenModal}>Add Budget</StyledButton>
        </BudgetsRow>
        <BudgetTable budgets={budgets} />
        <BudgetModal
          showModal={showModal}
          budgetObject={budgetObject}
          categories={categories}
          handleChange={handleChange}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      </Layout>
    );
  }
}

Budgets.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  budgets: PropTypes.instanceOf(Array).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired,
  mutate: PropTypes.func
};

Budgets.defaultProps = {
  mutate: () => {}
};

export default compose(
  withRouter,
  graphql(ADD_BUDGET),
  withCategoryQuery,
  withBudgetQuery
)(Budgets);
