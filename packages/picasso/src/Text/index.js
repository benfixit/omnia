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
  color: ${themeGet('colors.textDefault')};
  font-size: ${themeGet('fontSizes.1')};
  font-weight: ${themeGet('fontWeights.4')};
  box-sizing: border-box;
`;

Text.defaultProps = {
  as: 'p'
};

Text.propTypes = {
  as: PropTypes.oneOf(supportedElements)
};

export default Text;
