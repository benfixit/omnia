import styled from 'styled-components';
import Picasso from '@omnia/picasso';

const { Button, Pane } = Picasso;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 412px;
  padding: 40px 16px;
  border-radius: 3px;
  border: thin solid #dddddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) 0 1px 2px rgba(0, 0, 0, 0.4);
  align-items: center;
  margin-bottom: 20px;
`;

export const FormButton = styled(Button)`
  margin: 12px 0px;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  margin: 12px 0px;
`;

export const StyledPane = styled(Pane)`
  width: 100%;
  justify-content: flex-end;
`;
