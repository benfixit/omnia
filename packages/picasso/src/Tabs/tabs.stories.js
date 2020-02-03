import React from 'react';
import Tabs from './index';

export default {
  title: 'Components|Tabs',
  component: Tabs
};

export const BasicTabs = () => (
  <Tabs>
    <Tabs.Panel label="Tab 1">
      <h4>Tab 1</h4>
      <p>
        Tab 1: Disrupt minimum viable product pivot waterfall is so 2000 and
        late viral long shadow.
      </p>
    </Tabs.Panel>
    <Tabs.Panel label="Tab 2">
      <h4>Tab 2</h4>
      <p>
        Tab 2: Disrupt minimum viable product pivot waterfall is so 2000 and
        late viral long shadow.
      </p>
    </Tabs.Panel>
  </Tabs>
);
