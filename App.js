import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Nav from './src/shared/nav';
import AuthNav from './src/Auth/nav';
import AuthLoadingScreen from './src/Auth/AuthLoading';
import { ProvideAuth } from './src/shared/use-auth';

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNav,
    App: Nav,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

const App = () => (
  <ProvideAuth>
    <AppContainer />
  </ProvideAuth>
);

export default App;
