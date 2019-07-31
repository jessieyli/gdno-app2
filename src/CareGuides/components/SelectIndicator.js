import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, space } from '../../shared/constants';

const ss = StyleSheet.create({
  style: {
    width: space[4],
    height: space[4],
    borderRadius: space[2],
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  selected: {
    backgroundColor: COLORS.grass,
    borderColor: COLORS.grass,
  }
});

const SelectIndicator = ({
  selected = false,
}) => (
  <View style={[ss.style, selected ? ss.selected : {}]} />
);

/* eslint-disable react/require-default-props */
SelectIndicator.propTypes = {
  selected: PropTypes.bool,
};

export default SelectIndicator;
