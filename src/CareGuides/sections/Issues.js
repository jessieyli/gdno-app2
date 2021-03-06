import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  Body,
  Header,
  Button,
} from '../../shared/components';
import { styles } from '../careGuideConstants';
import { LINKS } from '../../shared/constants';

const ss = StyleSheet.create({
  ...styles
});

const handleHelpPress = () => {
  WebBrowser.openBrowserAsync(LINKS.help);
};

const CareGuideIssues = () => (
  <View style={ss.main}>
    <View style={ss.topSection}>
      <Header>Issues</Header>
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

export default CareGuideIssues;
