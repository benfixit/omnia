import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { zIndex } from 'styled-system';

import Portal from '../Portal';
import Pane from '../Pane';
import Stack from '../Stack';
import Button from '../Button';
import themeGet from '../theme/utils';

const Container = styled(Pane)`
  display: ${props => (props.show ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  border: thin solid ${themeGet('colors.gray')};
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.4);
  flex-direction: column;
  padding: ${themeGet('space.4')};
  background-color: ${themeGet('colors.white')};
  ${zIndex};
`;

const AlertButtonWrapper = styled(Pane)`
  justify-content: flex-end;
  margin-top: ${themeGet('space.4')};
`;

const Alert = props => {
  const { children, show, type, onOk } = props;
  return (
    <Portal>
      <Stack>
        {zIndexValue => (
          <Container zIndex={zIndexValue} show={show}>
            {children}
            <AlertButtonWrapper>
              <Button variant={type} onClick={onOk}>
                OK
              </Button>
            </AlertButtonWrapper>
          </Container>
        )}
      </Stack>
    </Portal>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['primary', 'success', 'danger', 'secondary']),
  children: PropTypes.node,
  show: PropTypes.bool,
  onOk: PropTypes.func
};

Alert.defaultProps = {
  type: 'primary',
  children: null,
  show: false,
  onOk: () => {}
};

export default Alert;
