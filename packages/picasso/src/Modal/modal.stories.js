import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from './index';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import Pane from '../Pane';

export default {
  title: 'Components|Modal',
  component: Modal
};

const StyledPane = styled(Pane)`
  height: 1500px;
`;

const ActionPane = styled(Pane)`
  width: 100%;
  justify-content: flex-end;
`;

export const BasicModal = () => {
  return (
    <>
      <Modal
        render={({ toggle }) => {
          return (
            <>
              <Modal.Header>
                <Heading as="h2">Modal Heading</Heading>
              </Modal.Header>
              <Modal.Content>
                <Text>Some random content!!!</Text>
              </Modal.Content>
              <Modal.Action>
                <Button onClick={toggle}>Close</Button>
              </Modal.Action>
            </>
          );
        }}
      >
        {({ toggle }) => <Button onClick={toggle}>Show Basic Modal</Button>}
      </Modal>
    </>
  );
};

export const ScrollableModal = () => {
  return (
    <>
      <Modal
        render={({ toggle }) => {
          return (
            <>
              <Modal.Header>
                <Heading as="h2">Scrollable Modal</Heading>
              </Modal.Header>
              <Modal.Content>
                <StyledPane>
                  <Text>
                    By default tabbing in OSX sees only controls, but not links
                    or anything else tabbable. This is system settings, and
                    Safari/FireFox obey. Press Option+Tab in Safary to loop
                    across all tabbables, or change the Safary settings. There
                    is no way to fix FireFox, unless change system settings
                    (Control+F7). See this issue for more information. By
                    default tabbing in OSX sees only controls, but not links or
                    anything else tabbable. This is system settings, and
                    Safari/FireFox obey. Press Option+Tab in Safary to loop
                    across all tabbables, or change the Safary settings. There
                    is no way to fix FireFox, unless change system settings
                    (Control+F7). See this issue for more information.
                  </Text>
                </StyledPane>
              </Modal.Content>
              <Modal.Action>
                <ActionPane>
                  <Button onClick={toggle}>Close</Button>
                </ActionPane>
              </Modal.Action>
            </>
          );
        }}
      >
        {({ toggle }) => (
          <Button onClick={toggle}>Show Scrollable Modal</Button>
        )}
      </Modal>
    </>
  );
};

const handleModalToggle = (show, setShow) => setShow(!show);

export const ControlledModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Modal
        show={show}
        onClose={() => handleModalToggle(show, setShow)}
        render={() => {
          return (
            <>
              <Modal.Header>
                <Heading as="h2">Controlled Modal Heading</Heading>
              </Modal.Header>
              <Modal.Content>
                <Text>Some random content!!!</Text>
              </Modal.Content>
              <Modal.Action>
                <Button onClick={() => handleModalToggle(show, setShow)}>
                  Close
                </Button>
              </Modal.Action>
            </>
          );
        }}
      >
        {() => (
          <Button onClick={() => handleModalToggle(show, setShow)}>
            Show Controlled Modal
          </Button>
        )}
      </Modal>
    </>
  );
};
