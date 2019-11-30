import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  StatusBar
} from 'react-native';
import * as Sentry from '@sentry/react-native';

import Nav from './src/shared/nav';
import AuthNav from './src/Auth/nav';
import AuthLoadingScreen from './src/Auth/AuthLoading';
import { sentryDsn } from './src/shared/secrets';
import { ProvideAuth } from './src/shared/use-auth';

Sentry.init({
  dsn: sentryDsn,
});


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
    <StatusBar
      backgroundColor="transparent"
      barStyle="dark-content"
      translucent
    />
    <AppContainer />
  </ProvideAuth>
);

export default App;
