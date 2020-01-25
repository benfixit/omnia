import React from 'react';
import styled from 'styled-components';
import Picasso from '@omnia/picasso';

const { Heading, Link, Pane, themeGet } = Picasso;

const CardLink = styled(Link)`
  display: flex;
  width: 125px;
  height: 64px;
  justify-content: center;
  align-items: center;
  border: thin solid ${themeGet('colors.lightGray')};
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const HomeContainer = styled(Pane)`
  flex-direction: column;
  height: 100vh;
`;

const NavBarContainer = styled(Pane)`
  flex: 1 0 70px;
  max-height: 70px;
  background-color: #2980b9;
`;

const SiteTitle = styled(Heading)`
  display: flex;
  margin: 0 auto;
  width: 60%;
  align-items: center;
  color: #ffffff;
`;

const AppListContainer = styled(Pane)`
  flex: 2;
  align-items: center;
`;

const AppListWrapper = styled(Pane)`
  margin: 0 auto;
  width: 60%;
  border: thin solid ${themeGet('colors.lightGray')};
  height: unset;
  border-radius: 3px;
  padding: ${themeGet('space.4')};
`;

const appList = [
  { name: 'Expense Tracker', route: 'http://localhost:8085' },
  { name: 'Picasso', route: 'http://localhost:60154' },
  { name: 'Poco a poco', route: 'http://localhost:9095' }
];

const Home = () => {
  return (
    <HomeContainer>
      <NavBarContainer>
        <SiteTitle>Omnia</SiteTitle>
      </NavBarContainer>
      <AppListContainer>
        <AppListWrapper>
          {appList.map(app => (
            <CardLink href={app.route} external target="_blank">
              {app.name}
            </CardLink>
          ))}
        </AppListWrapper>
      </AppListContainer>
    </HomeContainer>
  );
};

export default Home;
