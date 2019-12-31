import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';

class CustomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true
    };
  }

  handleSubmit = () => {
    const { isValid } = this.state;
    if (isValid) {
      console.log('Form is valid');
    } else {
      console.log('Form is not valid');
    }
  };

  validForm = () => {
    const keys = Object.keys(this.state);
    for (let i = 0; i < keys.length; ++i) {
      if (!this.state[keys[i]] && keys[i] !== 'isValid') {
        return false;
      }
    }
    return true;
  };

  notify(name, valid) {
    const { validForm } = this;
    this.setState(
      {
        [name]: valid
      },
      () => {
        this.setState({
          isValid: validForm()
        });
      }
    );
  }

  render() {
    const { isValid } = this.state;
    const { notify } = this;
    return (
      <div>
        <Input
          type="text"
          name="description"
          placeholder="Description"
          label="2 - 3 characters"
          notify={notify}
          errorMessage="Must contain 2 - 3 digits"
        />
        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </div>
    );
  }
}

export default CustomForm;
