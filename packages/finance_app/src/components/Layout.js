import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { Layout as LayoutStyle, Heading } from '../styles';
import { monthsOfYear } from '../utils/date';

const NavRow = styled(LayoutStyle.Row)`
  justify-content: space-between;
  padding: 14px 30px;
  background-color: #a09280;
`;

const LowerNavRow = styled(LayoutStyle.Row)`
  padding: 14px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const NavH1 = styled(Heading.H1)`
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

const LowerNavLink = styled(NavLink)`
  color: #a09280;
`;

const Layout = props => {
  const {
    children,
    match: { url }
  } = props;
  const root = url.slice(1).split('/')[0];
  return (
    <LayoutStyle.Container>
      <NavRow>
        <NavH1>
          <NavLink to="/">Personal App</NavLink>
        </NavH1>
        <NavUl>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/budgets">Budgets</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
        </NavUl>
      </NavRow>
      <LowerNavRow>
        <NavUl>
          {Object.keys(monthsOfYear).map(month => (
            <LowerNavLink
              key={v4()}
              to={`/${root}/2019/${month.toLowerCase()}`}
            >
              {month}
            </LowerNavLink>
          ))}
        </NavUl>
      </LowerNavRow>
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
