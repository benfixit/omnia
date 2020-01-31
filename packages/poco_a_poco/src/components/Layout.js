import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Picasso from '@omnia/picasso';

const { Button, Heading, Pane } = Picasso;

const Container = styled(Pane)`
  border: thin solid red;
  flex-direction: column;
`;

const NavRow = styled(Pane)`
  height: 60px;
  padding: 0px 128px;
  margin-bottom: 40px;
  justify-content: space-between;
  align-items: center;
  border: thin solid red;
`;

const StyledHeading = styled(Heading)`
  border: thin solid red;
  display: flex;
  font-size: 24px;
`;

const StyledButton = styled(Button)``;

const Layout = props => {
  const { children } = props;
  return (
    <Container>
      <NavRow>
        <StyledHeading>Poco a poco</StyledHeading>
        <StyledButton>Create Objective</StyledButton>
      </NavRow>
      {children}
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
