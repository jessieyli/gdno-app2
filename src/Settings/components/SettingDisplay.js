import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Type, FormLabel, FormInput } from '../../shared/components';
import { space } from '../../shared/constants';

const ss = StyleSheet.create({
  settingGroup: {
    marginBottom: space[2],
  }
});

const SettingDisplay = ({
  label,
  value = '',
}) => (
  <View style={ss.settingGroup}>
    <FormLabel>{label}</FormLabel>
    {value
      ? <FormInput>{value}</FormInput>
      : <Type size={24} weight="light" color="lightGray">No info saved</Type>
    }
  </View>
);

SettingDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default SettingDisplay;
