import React from 'react';
import styled from 'styled-components';

import Stack from './index';
import Pane from '../Pane';

export default {
  title: 'Components|Stack',
  component: Stack
};

const StyledPane = styled(Pane)`
  flex-direction: column;
  border: thin solid gray;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.4);
  padding: 20px;
  margin-bottom: 15px;
`;

export const withStack = () => {
  return (
    <Stack>
      {zIndexFirst => (
        <>
          <StyledPane>{`zIndex = ${zIndexFirst}`}</StyledPane>
          <Stack>
            {zIndexSecond => (
              <>
                <StyledPane>{`zIndex = ${zIndexSecond}`}</StyledPane>
                <Stack>
                  {zIndexThird => (
                    <>
                      <StyledPane>{`zIndex = ${zIndexThird}`}</StyledPane>
                    </>
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};
