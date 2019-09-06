import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './src/shared/secrets';
import Nav from './src/shared/nav';
import AuthNav from './src/Auth/nav';
import AuthLoadingScreen from './src/Auth/AuthLoading';

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

class App extends Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <AppContainer
        ref={(nav) => {
          this.navigator = nav;
        }}
      />
    );
  }
}

export default App;
