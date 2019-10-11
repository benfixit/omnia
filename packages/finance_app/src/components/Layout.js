import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout as LayoutStyle, Heading } from '../styles';

const NavRow = styled(LayoutStyle.Row)`
  justify-content: space-between;
  padding: 14px 30px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
`;

const NavH1 = styled(Heading.H1)`
  font-size: 20px;
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
`;

const Layout = props => {
  const { children } = props;
  return (
    <LayoutStyle.Container>
      <NavRow>
        <NavH1>Finance App</NavH1>
        <NavUl>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/budgets">Budgets</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
        </NavUl>
      </NavRow>
      {children}
    </LayoutStyle.Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
