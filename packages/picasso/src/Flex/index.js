import styled from 'styled-components';
import themeGet from '../theme/utils';

const Flex = styled.div`
  display: flex;
  padding: 24px;
  margin: ${themeGet('space.0')};
  background: ${themeGet('colors.white')};
  box-sizing: border-box;
`;

export default Flex;
