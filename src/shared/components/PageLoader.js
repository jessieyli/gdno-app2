import React from 'react';
import {
  SafeAreaView, StyleSheet, ActivityIndicator, View
} from 'react-native';
import PropTypes from 'prop-types';
import { FormLabel } from './Type';
import {
  centered, safeArea, colorKeys, space, COLORS
} from '../constants';

const style = StyleSheet.create({
  safeArea,
  centered,
  labelSpacing: {
    paddingHorizontal: space[4],
    paddingVertical: space[2],
  },
});

const PageLoader = ({ size, color, label }) => (
  <SafeAreaView style={style.safeArea}>
    <View style={style.centered}>
      <ActivityIndicator size={size} color={COLORS[color]} />
      {label
        ? (
          <View style={style.labelSpacing}>
            <FormLabel align="center">{label}</FormLabel>
          </View>
        ) : null
      }
    </View>
  </SafeAreaView>
);

PageLoader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(colorKeys),
  label: PropTypes.string,
};

PageLoader.defaultProps = {
  size: 'large',
  color: 'grass',
  label: '',
};

export default PageLoader;
