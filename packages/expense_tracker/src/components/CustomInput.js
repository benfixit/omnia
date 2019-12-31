import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 4px 2px;
`;

const ErrorMessage = styled.div`
  padding: 4px 2px;
  color: #990000;
`;

const StyledInput = styled.input`
  padding: 4px;
  min-height: 20px;
  border: thin solid grey;
  border-radius: 3px;
  min-width: 200px;
`;

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      error: ''
    };
  }

  handleChange = event => {
    const { handleValidate } = this;
    const error = handleValidate(event.target.value);
    this.setState({
      data: event.target.value,
      error
    });
  };

  handleValidate = value => {
    const { validate, errorMessage } = this.props;
    const valid = validate(value);
    return valid ? '' : errorMessage;
  };

  render() {
    const { error, data } = this.state;
    const { errorMessage, label } = this.props;
    const { handleChange } = this;
    return (
      <Container>
        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <div>
          {label && <label>{label}</label>}
          <StyledInput value={data} onChange={handleChange} {...this.props} />
        </div>
      </Container>
    );
  }
}

Input.propTypes = {
  validate: PropTypes.func,
  errorMessage: PropTypes.string,
  label: PropTypes.string
};

Input.defaultProps = {
  validate: () => {},
  errorMessage: 'Wrong value',
  label: ''
};

export default Input;
