import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pane from '../Pane';
import Button from '../Button';

const StyledPane = styled(Pane)`
  border: thin solid red;
  justify-content: flex-end;
  width: 100%;
`;

const ModalAction = props => {
  const { onClose } = props;
  return (
    <StyledPane>
      <Button onClick={onClose}>Close</Button>
    </StyledPane>
  );
};

ModalAction.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalAction;
