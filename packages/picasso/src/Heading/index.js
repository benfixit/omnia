import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text';
import themeGet from '../theme/utils';

const supportedHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const fontSize = ({ as, theme }) => ({
  'font-size': theme.headingSizes[supportedHeadings.indexOf(as)]
});

const Heading = styled(Text)`
  padding: 0;
  margin: 0;
  color: ${themeGet('colors.black')};
  font-weight: ${themeGet('fontWeights.6')};
  ${fontSize}
`;

Heading.propTypes = {
  as: PropTypes.oneOf(supportedHeadings)
};

Heading.defaultProps = {
  as: 'h1'
};

export default Heading;
