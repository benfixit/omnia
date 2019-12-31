import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  width: 125px;
  height: 125px;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px red;
`;

const Card = props => {
  const { title, ...rest } = props;
  return (
    <StyledCard {...rest}>
      <h3>{title}</h3>
    </StyledCard>
  );
};

Card.propTypes = {
  title: PropTypes.string
};

Card.defaultProps = {
  title: ''
};

export default Card;
