import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { centered } from '../constants';
import sadPlant from '../assets/sad-plant.png';
import { Body, SubHead } from './Type';
import Button from './Button';

const ss = StyleSheet.create({
  centered,
  text: {
    padding: 20,
  },
  callToAction: {
    marginVertical: 10,
  }
});

const ErrorState = ({
  title, details, callToAction, action
}) => (
  <View style={ss.centered}>
    <Image
      source={sadPlant}
      style={{ width: 174, height: 156 }}
    />
    <View style={ss.text}>
      <SubHead align="center" weight="bold">{title}</SubHead>
      <Body align="center">{details}</Body>
      {!!callToAction
        && (
        <View style={ss.callToAction}>
          <Button onPress={action}>{callToAction}</Button>
        </View>
        )
      }
    </View>
  </View>
);

ErrorState.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  callToAction: PropTypes.string,
  action: PropTypes.func,
};

ErrorState.defaultProps = {
  title: 'Oh, no!',
  details: 'Something went wrong.',
  callToAction: '',
  action: () => {},
};

export default ErrorState;
