import React from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import FlexBox from './FlexBox';
import Card from './Card';

const StyledContainer = styled(FlexBox)`
  padding: 20px;
  border: thin solid red;
`;

const Home = () => {
  return (
    <Layout>
      <StyledContainer>
        <Card title="Finance App" />
      </StyledContainer>
    </Layout>
  );
};

export default Home;
