import React, { useState } from 'react';

import Dialog from './index';
import Button from '../Button';
import Text from '../Text';

export default {
  title: 'Dialog',
  component: Dialog
};

export const BasicDialog = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Dialog show={show} title="Test Dialog">
        <Dialog.Header title="Test Dialog" />
        <Dialog.Content>
          <Text>
            Definition: Brit. Slang to run away or depart; decamp. Origin of
            scarper ultimately from Italian scap pare, to run away, escape from
            Late Latin an unverified.
          </Text>
        </Dialog.Content>
        <Dialog.Action
          onCancel={() => setShow(false)}
          onOk={() => setShow(false)}
        />
      </Dialog>
      <Button onClick={() => setShow(true)}>Show Dialog</Button>
    </>
  );
};
