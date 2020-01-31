import React from 'react';
import { Query } from 'react-apollo';
import { v4 } from 'uuid';
import styled from 'styled-components';
import Picasso from '@omnia/picasso';

import { GET_OBJECTIVES } from '../graphql/objectives';
import Layout from './Layout';

const { Flex, Heading, Loading, Pane, Text } = Picasso;

const Wrapper = styled(Pane)`
  border: thin solid red;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
`;

const StyledList = styled(Pane)`
  flex-direction: column;
`;

const StyledItem = styled(Flex)`
  margin-bottom: 16px;
  border: thin solid #dddddd;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) 0 1px 2px rgba(0, 0, 0, 0.4);
  height: 140px;
`;

const StyledHeading = styled(Heading)`
  font-size: 22px;
  margin-bottom: 40px;
`;

const Objectives = () => {
  return (
    <Layout>
      <Wrapper>
        <StyledHeading>My Objectives</StyledHeading>
        <Query query={GET_OBJECTIVES}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return 'Error...';
            const { objectives } = data;
            return (
              <StyledList>
                {objectives.map(objective => (
                  <StyledItem key={v4()}>
                    <Heading as="h3">{objective.title}</Heading>
                    <Text>{objective.description}</Text>
                  </StyledItem>
                ))}
              </StyledList>
            );
          }}
        </Query>
      </Wrapper>
    </Layout>
  );
};

export default Objectives;
