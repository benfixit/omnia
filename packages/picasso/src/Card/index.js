import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import themeGet from '../theme/utils';

const StyledCard = styled.div`
  display: flex;
  width: 125px;
  height: 64px;
  justify-content: center;
  align-items: center;
  border: thin solid ${themeGet('colors.lightGray')};
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const Card = props => {
  const { children, ...rest } = props;
  return <StyledCard {...rest}>{children}</StyledCard>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;
