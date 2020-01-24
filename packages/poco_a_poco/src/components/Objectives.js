import React from 'react';
import { Query } from 'react-apollo';
import { v4 } from 'uuid';
import styled from 'styled-components';
import Picasso from '@omnia/picasso';
import { GET_OBJECTIVES } from '../graphql/objectives';

const { Flex, Heading, Loading, Pane, Text } = Picasso;

const Container = styled(Pane)``;

const Wrapper = styled(Pane)`
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
  font-size: 24px;
`;

const Objectives = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default Objectives;