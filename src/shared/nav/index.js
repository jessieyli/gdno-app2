import React from 'react';
import { createStackNavigator } from 'react-navigation';
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
        headerTitle: 'Home',
        ...centeredHeader,
        headerRight: (<LogOutButton />),
      }),
    },
    CareGuides: {
      screen: MyCareGuides,
      navigationOptions: () => ({
        headerTitle: 'My Plants'
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
        headerTitle: 'Getting Started'
      }),
    },
  },
  {
    initialRouteName: 'Home'
  }
);

export default MainNavigation;
