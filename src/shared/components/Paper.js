import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, floating, space } from '../constants';

const ss = StyleSheet.create({
  paperStyle: {
    backgroundColor: COLORS.white,
    padding: space[0],
    ...Platform.select({
      ...floating(5),
    }),
  }
});

const Paper = ({ children, style = {} }) => (
  <View style={[ss.paperStyle, style]}>
    {children}
  </View>
);

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default Paper;
