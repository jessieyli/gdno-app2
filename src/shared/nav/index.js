import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from '../../Home/Home';
import MyCareGuides from '../../CareGuides/MyCareGuides';
import CareGuide from '../../CareGuides/CareGuide';
import Settings from '../../Settings/Settings';
import Help from '../../Help/Help';
import GettingStarted from '../../GettingStarted/GettingStarted';
import { centeredHeader } from '../constants';
import { Touchable, Body } from '../components';

const MainNavigation = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        headerTitle: 'Home',
        ...centeredHeader,
        headerRight: (
          <Touchable onPress="Settings">
            <View style={{ padding: 10, backgroundColor: '#ffffff' }}>
              <Body weight="bold" color="grass">Settings</Body>
            </View>
          </Touchable>
        ),
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
    Settings: {
      screen: Settings,
      path: 'settings',
      navigationOptions: () => ({
        headerTitle: 'Profile',
        ...centeredHeader,
      }),
    },
    GettingStarted,
  },
  {
    initialRouteName: 'Home'
  }
);

export default MainNavigation;
