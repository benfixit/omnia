import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TabPanelComponent from './TabPanel';
import Button from '../Button';
import themeGet from '../theme/utils';

const TabsWrapper = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
`;

const TabButton = styled(Button)`
  background: ${themeGet('colors.white')};
  color: ${themeGet('colors.primary')};
  border-bottom: 4px solid
    ${props =>
      props.selected ? themeGet('colors.primary') : themeGet('colors.white')};
  border-radius: 0px;
  transition: border-color 0.2s ease-in;
  &:hover,
  &:focus,
  &:active {
    background: ${themeGet('colors.white')};
    border-bottom: 4px solid
      ${props => (props.selected ? themeGet('colors.primary') : '#efefef')};
  }
`;

const Content = styled.div``;

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }

  setSelectedTab = index => {
    this.setState({
      selectedTab: index
    });
  };

  render() {
    const { children } = this.props;
    const { selectedTab } = this.state;
    const { setSelectedTab } = this;
    return (
      <TabsWrapper>
        <TabList>
          {React.Children.map(children, (child, index) => {
            const {
              props: { label }
            } = child;
            return (
              <TabButton
                selected={selectedTab === index}
                onClick={() => setSelectedTab(index)}
              >
                {label}
              </TabButton>
            );
          })}
        </TabList>
        <Content>
          {React.Children.map(children, (child, index) =>
            selectedTab === index ? child : undefined
          )}
        </Content>
      </TabsWrapper>
    );
  }
}

Tabs.Panel = TabPanelComponent;

Tabs.propTypes = {
  children: PropTypes.node.isRequired
};

export default Tabs;
