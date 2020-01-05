import PropTypes from 'prop-types';
import styled from 'styled-components';

import themeGet from '../theme/utils';

const supportedElements = [
  'p',
  'blockquote',
  'label',
  'span',
  'strong',
  'ul',
  'li',
  'small',
  'caption'
];

const Text = styled.p`
  font-family: ${themeGet('fonts.sansSerif')};
  color: ${themeGet('colors.primary')};
  font-size: ${themeGet('fontSizes.1')};
  font-weight: ${themeGet('fontWeights.4')};
`;

Text.defaultProps = {
  as: 'p'
};

Text.propTypes = {
  as: PropTypes.oneOfType(supportedElements)
};

export default Text;
