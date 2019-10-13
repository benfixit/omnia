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

const StyledSelect = styled.select`
  padding: 4px;
  height: 30px;
  border: thin solid grey;
  border-radius: 3px;
  min-width: 210px;
`;

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
          return option.title === field.value;
        })}
        onChange={() => {
          // eslint-disable-next-line no-restricted-globals
          setFieldValue(field.name, event.target.value);
        }}
      >
        {options.map(({ _id: id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </StyledSelect>
    </Container>
  );
};

Select.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
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
