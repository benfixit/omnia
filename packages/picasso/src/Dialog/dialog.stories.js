import React from 'react';
import styled from 'styled-components';

import Dialog from './index';
import Button from '../Button';
import Text from '../Text';
import Heading from '../Heading';
import Pane from '../Pane';

export default {
  title: 'Components|Dialog',
  component: Dialog
};

const ActionPane = styled(Pane)`
  width: 100%;
  justify-content: space-around;
  button {
    width: 150px;
  }
`;

export const BasicDialog = () => {
  return (
    <>
      <Dialog
        render={({ toggle }) => {
          return (
            <>
              <Dialog.Header>
                <Heading as="h2">Dialog Heading</Heading>
              </Dialog.Header>
              <Dialog.Content>
                <Text>Some random content!!!</Text>
              </Dialog.Content>
              <Dialog.Action>
                <ActionPane>
                  <Button variant="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                  <Button onClick={toggle}>OK</Button>
                </ActionPane>
              </Dialog.Action>
            </>
          );
        }}
      >
        {({ toggle }) => <Button onClick={toggle}>Show Dialog</Button>}
      </Dialog>
    </>
  );
};
