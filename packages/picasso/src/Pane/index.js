import styled from 'styled-components';
import themeGet from '../theme/utils';

const Pane = styled.div`
  display: flex;
  padding: ${themeGet('space.0')};
  margin: ${themeGet('space.0')};
  box-sizing: border-box;
`;

export default Pane;
