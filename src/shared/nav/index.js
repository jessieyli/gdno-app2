import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Image } from 'react-native';

import logo from '../assets/icon-transparent.png';
import Home from '../../Home/Home';
import MyCareGuides from '../../CareGuides/MyCareGuides';
import CareGuide from '../../CareGuides/CareGuide';
// import Settings from '../../Settings/Settings';
import Help from '../../Help/Help';
import GettingStarted from '../../GettingStarted/GettingStarted';
import { centeredHeader } from '../constants';
import { LogOutButton } from '../components';

const MainNavigation = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        headerTitle: (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              source={logo}
              style={{ width: 24, height: 24 }}
            />
          </View>
        ),
        ...centeredHeader,
        headerLeft: (<View />),
        headerRight: (<LogOutButton />),
      }),
    },
    CareGuides: {
      screen: MyCareGuides,
      navigationOptions: () => ({
        headerTitle: 'My Plants',
        ...centeredHeader,
      }),
    },
    CareGuide,
    Help,
    // Settings: {
    //   screen: Settings,
    //   path: 'settings',
    //   navigationOptions: () => ({
    //     headerTitle: 'Profile',
    //     ...centeredHeader,
    //   }),
    // },
    GettingStarted: {
      screen: GettingStarted,
      navigationOptions: () => ({
        headerTitle: 'Getting Started',
        ...centeredHeader,
      }),
    },
  },
  {
    initialRouteName: 'Home'
  }
);

export default MainNavigation;
