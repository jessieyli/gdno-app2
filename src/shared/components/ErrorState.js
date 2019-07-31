import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { centered } from '../constants';
import sadPlant from '../assets/sad-plant.png';
import { Body, SubHead } from './Type';

const ss = StyleSheet.create({
  centered,
  text: {
    padding: 20,
  }
});

const ErrorState = ({ title, details }) => (
  <View style={ss.centered}>
    <Image
      source={sadPlant}
      style={{ width: 174, height: 156 }}
    />
    <View style={ss.text}>
      <SubHead align="center" weight="bold">{title}</SubHead>
      <Body align="center">{details}</Body>
    </View>
  </View>
);

ErrorState.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
};

ErrorState.defaultProps = {
  title: 'Oh, no!',
  details: 'Something went wrong.',
};

export default ErrorState;
