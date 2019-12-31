import React from 'react';
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

const Input = props => {
  const {
    field,
    form: { touched, errors },
    ...rest
  } = props;
  return (
    <Container>
      {touched[field.name] && errors[field.name] && (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      )}
      <StyledInput type="text" {...field} {...rest} />
    </Container>
  );
};

Input.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string
  }),
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({})
  })
};

Input.defaultProps = {
  field: {},
  form: {}
};

export default Input;
