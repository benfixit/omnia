import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { Link as RouterLink } from 'react-router-dom';

import themeGet from '../theme/utils';

const linkVariant = variant({
  scale: 'links',
  variants: {
    primary: {
      color: 'primary'
    },
    danger: {
      color: 'danger'
    }
  }
});

const baseStyles = css`
  text-decoration: none;
  &:hover {
    color: ${themeGet('colors.hoveredPrimary')};
  }
  &:focus {
    color: ${themeGet('colors.hoveredPrimary')};
  }
`;

const StyledLink = styled.a`
  ${baseStyles};
  ${linkVariant};
`;

const StyledRouterLink = styled(RouterLink)`
  ${baseStyles};
  ${linkVariant};
`;

const Link = props => {
  const { children, external, href, ...rest } = props;
  if (external) {
    return (
      <StyledLink href={href} {...rest}>
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledRouterLink to={href} {...rest}>
      {children}
    </StyledRouterLink>
  );
};

Link.propTypes = {
  children: PropTypes.node,
  external: PropTypes.bool,
  href: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'danger', 'success'])
};

Link.defaultProps = {
  children: null,
  external: false,
  variant: 'primary'
};

export default Link;
