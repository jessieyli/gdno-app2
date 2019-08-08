import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { Header, Body, Button } from '../shared/components';
import { COLORS, LINKS, space } from '../shared/constants';

const ss = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  section: {
    paddingHorizontal: space[2],
    paddingVertical: space[2],
  },
  topSection: {
    paddingHorizontal: space[2],
    paddingVertical: space[4],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
});

const handleHelpPress = () => {
  WebBrowser.openBrowserAsync(LINKS.help);
};

const HelpScreen = () => (
  <View style={ss.main}>
    <View style={ss.topSection}>
      <Header>Help!</Header>
      <Body>
        If you&apos;re having plant problems I feel bad for you son... but we may know how
         to help! Go ahead and drop us a line -- this is a no judgement grow zone.
      </Body>
    </View>

    <View style={ss.section}>
      {Platform.OS === 'android'
        // TODO: better experience for IOS
        ? <Button onPress={handleHelpPress}>Help me</Button>
        : <Body weight="bold">help@growgardenio.zendesk.com</Body>
      }
    </View>
  </View>
);

export default HelpScreen;
