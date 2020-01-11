import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabContent = styled.div`
  flex: 1;
  width: 100%;
`;

export const TabPanel = props => {
  const { children } = props;
  return <TabContent>{children}</TabContent>;
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired
};

export default TabPanel;
