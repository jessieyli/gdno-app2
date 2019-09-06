import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Body, Button } from '../../shared/components';
import { space } from '../../shared/constants';

const styles = StyleSheet.create({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  buttonGroupChild: {
    flexGrow: 1,
    paddingVertical: space[4],
    paddingHorizontal: space[2],
  }
});

const GrowerTypeButtonGroup = ({ formProps, formKey }) => {
  const handlePress = (val) => {
    formProps.handleChange(formKey)(val);
  };
  return (
    <React.Fragment>
      <View style={styles.buttonGroup}>
        <Button
          onPress={() => handlePress('new')}
          style={styles.buttonGroupChild}
          inverted={formProps.values[formKey] !== 'new'}
        >
          I&apos;m a new grower
        </Button>
        <Button
          style={styles.buttonGroupChild}
          onPress={() => handlePress('old')}
          inverted={formProps.values[formKey] !== 'old'}
        >
              I&apos;ve done this before
        </Button>
      </View>
      {formProps.errors[formKey]
        && (
        <Body color="danger">
          {formProps.errors[formKey]}
        </Body>
        )
      }
    </React.Fragment>
  );
};

GrowerTypeButtonGroup.propTypes = {
  formProps: PropTypes.object,
  formKey: PropTypes.string.isRequired,
};

export default GrowerTypeButtonGroup;
