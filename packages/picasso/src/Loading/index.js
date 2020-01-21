import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Pane from '../Pane';

const StyledPane = styled(Pane)`
  justify-content: center;
  align-items: center;
  height: ${props => (props.fullPage ? '100vh' : '100%')};
`;

const loadingAnimation = keyframes`
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
    transform: scale(1.5) translateX(25px);
  }
  100% {
    opacity: 1;
    transform: scale(2) translateX(50px);
  }
`;

const BallWrapper = styled(Pane)`
  align-items: center;
  width: 100px;
  height: 24px;
  padding: 4px 6px;
`;

const Ball = styled.div`
  background-color: ${props => props.color};
  width: 12px;
  height: 12px;
  border-radius: 10px;
  animation: ${loadingAnimation} 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Loading = props => {
  const { fullPage, color } = props;
  return (
    <StyledPane fullPage={fullPage}>
      <BallWrapper>
        <Ball color={color} />
      </BallWrapper>
    </StyledPane>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
  fullPage: PropTypes.bool
};

Loading.defaultProps = {
  color: '#3498db', // TODO This default is useless at the moment cos we are forcing primary inside the Ball component
  fullPage: true
};

export default Loading;
