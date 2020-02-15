import gql from 'graphql-tag';

export const GET_NOTES = gql`
  query NotesList {
    notes {
      _id
      description
      createdAt
    }
  }
`;

export const GET_NOTE = gql`
  query SingleNote {
    note {
      _id
      description
    }
  }
`;

export const ADD_NOTE = gql`
  mutation($description: String) {
    createNote(description: $description) {
      _id
      description
    }
  }
`;
