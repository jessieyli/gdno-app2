import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Image } from 'react-native';

import logo from '../assets/icon-transparent.png';
import LogOutButton from '../components/LogOutButton';
import Home from '../../Home/Home';
import PersonalHome from '../../Home/PersonalHome';
import MyCareGuides from '../../CareGuides/MyCareGuides';
import CareGuide from '../../CareGuides/CareGuide';
import Settings from '../../Auth/Settings';
import EditSettings from '../../Auth/EditSettings';
import Help from '../../Help/Help';
import GettingStarted from '../../GettingStarted/GettingStarted';
import { centeredHeader } from '../constants';

const MainNavigation = createStackNavigator(
  {
    Home: {
      screen: PersonalHome,
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
    Settings: {
      screen: Settings,
      path: 'settings',
      navigationOptions: () => ({
        headerTitle: 'Profile',
        ...centeredHeader,
      }),
    },
    EditSettings: {
      screen: EditSettings,
      navigationOptions: () => ({
        headerTitle: 'Edit Profile',
        ...centeredHeader,
      }),
    },
    GettingStarted: {
      screen: GettingStarted,
      navigationOptions: () => ({
        headerTitle: 'Get Started',
        ...centeredHeader,
      }),
    },
  },
  {
    initialRouteName: 'Home'
  }
);

export default MainNavigation;
