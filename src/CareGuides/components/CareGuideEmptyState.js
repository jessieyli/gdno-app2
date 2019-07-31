import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button, DetailHeader } from '../../shared/components';
import { space, verticallyCentered } from '../../shared/constants';

const style = StyleSheet.create({
  container: {
    ...verticallyCentered,
  },
  titleContainer: {
    alignSelf: 'center',
    maxWidth: 200,
  },
  buttonContainer: {
    marginVertical: space[3],
    marginHorizontal: space[2],
  }
});

const CareGuideEmptyState = ({ onButtonClick }) => (
  <View style={style.container}>
    <View style={style.titleContainer}>
      <DetailHeader align="center">So what are you growing?</DetailHeader>
    </View>
    <View style={style.buttonContainer}>
      <Button onPress={onButtonClick}>Add Plants</Button>
    </View>
  </View>
);

CareGuideEmptyState.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};

export default CareGuideEmptyState;
