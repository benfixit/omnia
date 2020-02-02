import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { zIndex, variant as styledVariant } from 'styled-system';

import Portal from '../Portal';
import Pane from '../Pane';
import Stack from '../Stack';
import Button from '../Button';
import themeGet from '../theme/utils';

const alertVariants = {
  variants: {
    primary: {
      borderLeft: 'thick solid #3498db'
    },
    success: {
      borderLeft: 'thick solid #5cb85c'
    },
    danger: {
      borderLeft: 'thick solid #d9534f'
    },
    secondary: {
      borderLeft: 'thick solid #eeeeee'
    }
  }
};

const Container = styled(Pane)`
  display: ${props => (props.show ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  border-radius: 3px;
  flex-direction: column;
  padding: ${themeGet('space.4')};
  background-color: ${themeGet('colors.offWhite')};
  ${zIndex};
  ${styledVariant(alertVariants)};
`;

const AlertButtonWrapper = styled(Pane)`
  justify-content: flex-end;
  margin-top: ${themeGet('space.4')};
`;

const Alert = props => {
  const { children, show, variant, onOk, ...rest } = props;
  return (
    <Portal>
      <Stack>
        {zIndexValue => (
          <Container
            zIndex={zIndexValue}
            show={show}
            variant={variant}
            {...rest}
          >
            {children}
            <AlertButtonWrapper>
              <Button variant={variant} onClick={onOk}>
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
  variant: PropTypes.oneOf(['primary', 'success', 'danger', 'secondary']),
  children: PropTypes.node,
  show: PropTypes.bool,
  onOk: PropTypes.func
};

Alert.defaultProps = {
  variant: 'primary',
  children: null,
  show: false,
  onOk: () => {}
};

export default Alert;
