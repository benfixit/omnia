import React, { useState } from 'react';
import styled from 'styled-components';
import { BooleanValue } from 'react-values';

import Alert from './index';
import Button from '../Button';
import Pane from '../Pane';

export default {
  title: 'Alert',
  component: Alert
};

const StyledPane = styled(Pane)`
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  width: 150px;
`;

const handleOk = setShow => {
  setShow(false);
};

export const BasicAlert = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Alert show={show} onOk={() => handleOk(setShow)}>
        <h1>Welcome Here</h1>
        <p>Some random content!!!</p>
      </Alert>
      <Button onClick={() => setShow(true)}>Show Alert</Button>
    </>
  );
};

export const BasicAlertWithVariant = () => {
  return (
    <>
      <StyledPane>
        <BooleanValue defaultValue={false}>
          {({ value, set }) => (
            <>
              <Alert show={value} onOk={() => set(false)}>
                <p>Primary Alert</p>
              </Alert>
              <StyledButton onClick={() => set(true)}>
                Primary Alert
              </StyledButton>
            </>
          )}
        </BooleanValue>
      </StyledPane>
      <StyledPane>
        <BooleanValue defaultValue={false}>
          {({ value, set }) => (
            <>
              <Alert show={value} onOk={() => set(false)} type="secondary">
                <p>Secondary Alert</p>
              </Alert>
              <StyledButton onClick={() => set(true)} variant="secondary">
                Secondary Alert
              </StyledButton>
            </>
          )}
        </BooleanValue>
      </StyledPane>
      <StyledPane>
        <BooleanValue defaultValue={false}>
          {({ value, set }) => (
            <>
              <Alert show={value} onOk={() => set(false)} type="danger">
                <p>Danger Alert</p>
              </Alert>
              <StyledButton onClick={() => set(true)} variant="danger">
                Danger Alert
              </StyledButton>
            </>
          )}
        </BooleanValue>
      </StyledPane>
      <StyledPane>
        <BooleanValue defaultValue={false}>
          {({ value, set }) => (
            <>
              <Alert show={value} onOk={() => set(false)} type="success">
                <p>Success Alert</p>
              </Alert>
              <StyledButton onClick={() => set(true)} variant="success">
                Success Alert
              </StyledButton>
            </>
          )}
        </BooleanValue>
      </StyledPane>
    </>
  );
};
