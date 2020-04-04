import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Picasso from '@omnia/picasso';

const { Pane } = Picasso;

const NoteContainer = styled(Pane)`
  flex-direction: column;
  justify-content: center;
  padding: 15px 10px;
  width: 60%;
  margin: 0px auto;
`;

const Note = styled(Pane)`
  padding: 15px 10px;
  margin-bottom: 20px;
  border: thin solid gray;
`;

const NoteList = props => {
  const { notes } = props;

  return (
    <NoteContainer>
      {notes.map(note => {
        const { _id: noteId } = note;
        return <Note key={noteId}>{note.description}</Note>;
      })}
    </NoteContainer>
  );
};

NoteList.propTypes = {
  notes: PropTypes.instanceOf(Array).isRequired
};

export default NoteList;
