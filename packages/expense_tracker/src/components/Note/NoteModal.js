import React from 'react';
import PropTypes from 'prop-types';
import Picasso from '@omnia/picasso';

import { FormButton, StyledButton, StyledForm, StyledPane } from '../../styles';

const { Button, Heading, TextAreaField, Modal } = Picasso;

const NoteModal = props => {
  const {
    data: { description },
    handleChange,
    handleSubmit
  } = props;

  return (
    <Modal
      render={({ toggle }) => (
        <>
          <Modal.Header>
            <Heading as="h2">Notes</Heading>
          </Modal.Header>
          <Modal.Content>
            <StyledForm onSubmit={event => handleSubmit(event, toggle)}>
              <TextAreaField
                name="description"
                value={description}
                onChange={handleChange}
                label="Description"
              />
              <FormButton type="submit">Submit</FormButton>
            </StyledForm>
          </Modal.Content>
          <Modal.Action>
            <StyledPane>
              <Button onClick={toggle}>Close</Button>
            </StyledPane>
          </Modal.Action>
        </>
      )}
    >
      {({ toggle }) => <StyledButton onClick={toggle}>Add Note</StyledButton>}
    </Modal>
  );
};

NoteModal.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default NoteModal;
