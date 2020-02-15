import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import NoteModal from './NoteModal';
import NoteList from './NoteList';

import withNoteQuery from '../../hoc/withNoteQuery';
import { ADD_NOTE, GET_NOTES } from '../../graphql/notes';
import Layout from '../Layout';
import { StyledHeading } from '../../styles';

const { Pane } = Picasso;

const NotesRow = styled(Pane)`
  justify-content: space-between;
  padding: 14px 30px;
`;

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        description: ''
      }
    };
  }

  handleChange = event => {
    const { data } = this.state;
    const {
      target: { name, value }
    } = event;
    this.setState({
      data: { ...data, [name]: value }
    });
  };

  handleSubmit = (event, toggle) => {
    event.preventDefault();
    const {
      data: { description }
    } = this.state;
    const { mutate, history } = this.props;
    mutate({
      variables: {
        description
      },
      refetchQueries: [
        {
          query: GET_NOTES
        }
      ]
    }).then(() => {
      toggle();
      history.push(`/notes`);
    });
  };

  render() {
    const { data } = this.state;
    const { handleChange, handleSubmit } = this;
    const { notes } = this.props;

    return (
      <Layout>
        <NotesRow>
          <StyledHeading>Notes</StyledHeading>
          <NoteModal
            data={data}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </NotesRow>
        <NoteList notes={notes} />
      </Layout>
    );
  }
}

Note.propTypes = {
  notes: PropTypes.instanceOf(Array).isRequired,
  mutate: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default compose(withRouter, graphql(ADD_NOTE), withNoteQuery)(Note);
