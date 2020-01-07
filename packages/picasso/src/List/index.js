import styled from 'styled-components';
import PropTypes from 'prop-types';
import themeGet from '../theme/utils';

const List = styled.ul`
  box-sizing: border-box;
  display: flex;
  padding: ${themeGet('space.2')};
`;

const ListItem = styled.li`
  list-style: none;
  box-sizing: border-box;
  padding: ${themeGet('space.3')};
`;

List.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired
};

List.defaultProps = {
  as: 'ul'
};

List.Item = ListItem;

export default List;
