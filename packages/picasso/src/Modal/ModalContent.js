import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Pane from '../Pane';

const StyledPane = styled(Pane)`
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ModalContent = props => {
  const { children } = props;
  return <StyledPane>{children}</StyledPane>;
};

ModalContent.propTypes = {
  children: PropTypes.node.isRequired
};

export default ModalContent;
