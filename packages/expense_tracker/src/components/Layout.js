import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Picasso from '@omnia/picasso';
import { Layout as LayoutStyle } from '../styles';
import { getYearAndMonthText } from '../utils/date';

const { Heading, Link } = Picasso;

const NavRow = styled(LayoutStyle.Row)`
  justify-content: space-between;
  padding: 14px 30px;
  background-color: #a09280;
`;

const NavH1 = styled(Heading)`
  font-size: 20px;
  color: white;
`;

const NavUl = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  padding: 0 5px;
  margin: 0 10px;
  text-decoration: none;
  color: white;
`;

const Layout = props => {
  const { children } = props;
  const period = getYearAndMonthText();
  return (
    <LayoutStyle.Container>
      <NavRow>
        <NavH1>
          <NavLink href="/">Budget Tracker</NavLink>
        </NavH1>
        <NavUl>
          <NavLink href="/">Home</NavLink>
          <NavLink href={`/expenses/${period.year}/${period.month}`}>
            Expenses
          </NavLink>
          <NavLink href={`/incomes/${period.year}/${period.month}`}>
            Incomes
          </NavLink>
          <NavLink href={`/savings/${period.year}/${period.month}`}>
            Savings
          </NavLink>
        </NavUl>
      </NavRow>
      {children}
    </LayoutStyle.Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

export default withRouter(Layout);
