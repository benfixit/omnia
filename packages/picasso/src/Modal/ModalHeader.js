import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Pane from '../Pane';
import Heading from '../Heading';

const StyledPane = styled(Pane)`
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ModalHeader = props => {
  const { title } = props;
  return (
    <StyledPane>
      <Heading as="h2">{title}</Heading>
    </StyledPane>
  );
};

ModalHeader.propTypes = {
  title: PropTypes.string
};

ModalHeader.defaultProps = {
  title: ''
};

export default ModalHeader;
