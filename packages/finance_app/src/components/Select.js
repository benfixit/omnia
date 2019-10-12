import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

const Container = styled.div`
  padding: 4px 2px;
`;

const ErrorMessage = styled.div`
  padding: 4px 2px;
  color: #990000;
`;

const StyledSelect = styled.select`
  padding: 4px;
  height: 30px;
  border: thin solid grey;
  border-radius: 3px;
  min-width: 210px;
`;

const handleChange = (event, name, action) => {
  const {
    target: { value }
  } = event;
  action(name, value);
};

const Select = props => {
  const {
    field,
    form: { errors, touched, setFieldValue },
    options,
    ...rest
  } = props;
  return (
    <Container>
      {touched[field.name] && errors[field.name] && (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      )}
      <StyledSelect
        {...field}
        {...rest}
        value={options.find(option => {
          return option === field.value;
        })}
        onChange={() => {
          handleChange(field.name, setFieldValue);
        }}
      >
        {options.map(item => (
          <option key={v4()} value={item}>
            {item}
          </option>
        ))}
      </StyledSelect>
    </Container>
  );
};

Select.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }),
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    setFieldValue: PropTypes.func
  }),
  options: PropTypes.instanceOf(Array)
};

Select.defaultProps = {
  field: {},
  form: {},
  options: []
};

export default Select;
