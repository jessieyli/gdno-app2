import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';

import handleError from '../shared/data/handleError';
import {
  Header, Button, Media, FormLabel
} from '../shared/components';
import {
  LINKS, verticallyCentered, space, COLORS,
} from '../shared/constants';

const styles = StyleSheet.create({
  container: {
    ...verticallyCentered,
    padding: space[2],
  },
  title: {
    paddingBottom: space[2],
  },
  ctaBox: {
    backgroundColor: COLORS.cyan,
    paddingVertical: space[5],
    paddingHorizontal: space[7],
  },
  resources: {
    marginVertical: space[3],
  },
  buttonSpace: {
    marginVertical: space[0],
  },
  bottomLinks: {
    padding: space[2],
  },
});

export default class HomeScreen extends Component {
  handleIosMailto = (link) => {
    const cleanedLink = link.replace('mailto:', '');
    Alert.alert(
      'Email us!',
      cleanedLink,
      [
        {
          text: 'Got it',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  }

  handleOpenLink = (path) => {
    // TODO check and handle deep link before opening
    const url = LINKS[path] || LINKS.shop;
    if (path === 'help' && Platform.OS === 'ios') {
      this.props.navigation.navigate('Help');
    } else if (Platform.OS === 'ios' && url.indexOf('mailto:') >= 0) {
      this.handleIosMailto(url);
    } else {
      try {
        WebBrowser.openBrowserAsync(url);
      } catch (e) {
        handleError(e);
      }
    }
  }

  render() {
    return (
      <Media style={styles.container}>
        <Media.Item>
          <View style={styles.ctaBox}>
            <View style={styles.title}>
              <Header color="white" align="center" style={styles.title}>
                Let&apos;s get growing
              </Header>
            </View>
            <Button color="cyan" inverted onPress="CareGuides">Add Care Guides</Button>
          </View>
        </Media.Item>
        <Media.Body style={styles.resources}>
          <FormLabel>Resources</FormLabel>
          <View style={styles.buttonSpace}><Button align="left" color="grass" onPress="GettingStarted">Getting Started →</Button></View>
          <View style={styles.buttonSpace}><Button align="left" color="grass" onPress={() => this.handleOpenLink('shop')}>Shop →</Button></View>
          <View style={styles.buttonSpace}><Button align="left" color="grass" onPress={() => this.handleOpenLink('help')}>Get Help →</Button></View>
        </Media.Body>
        <Media.Item style={styles.bottomLinks}>
          <Button align="left" style={{ paddingVertical: space[1] }} transparent color="grass" onPress={() => this.handleOpenLink('instagram')}>Follow us on social</Button>
          <Button align="left" style={{ paddingVertical: space[1] }} transparent color="grass" onPress={() => this.handleOpenLink('feedback')}>Feedback</Button>
        </Media.Item>
      </Media>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
