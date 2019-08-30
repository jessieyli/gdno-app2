import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './src/shared/secrets';
import Nav from './src/shared/nav';

const AppContainer = createAppContainer(Nav);

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
