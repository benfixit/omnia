import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pane from '../Pane';
import Button from '../Button';

const StyledPane = styled(Pane)`
  justify-content: space-around;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 160px;
`;

const DialogAction = props => {
  const { onCancel, onOk } = props;
  return (
    <StyledPane>
      <StyledButton onClick={onCancel} variant="secondary">
        Cancel
      </StyledButton>
      <StyledButton onClick={onOk} variant="primary">
        Ok
      </StyledButton>
    </StyledPane>
  );
};

DialogAction.propTypes = {
  onCancel: PropTypes.func,
  onOk: PropTypes.func
};

DialogAction.defaultProps = {
  onCancel: () => {},
  onOk: () => {}
};

export default DialogAction;
