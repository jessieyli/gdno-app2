import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  Body, Touchable, ButtonText
} from '../../shared/components';
import { borderWide, space, COLORS } from '../../shared/constants';

const styles = StyleSheet.create({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 20,
    borderWidth: borderWide,
    borderColor: COLORS.grass,
    borderRadius: borderWide,
    backgroundColor: '#0ff',
  },
  selectedButton: {
    flexGrow: 1,
    alignItems: 'stretch',
    backgroundColor: COLORS.grass,
  },
  unselectedButton: {
    flexGrow: 1,
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
  },
  firstButton: {
    borderRightWidth: borderWide,
    borderRightColor: COLORS.grass,
  },
  buttonInner: {
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
        <View
          style={[
            styles.firstButton,
            formProps.values[formKey] === 'new'
              ? styles.selectedButton
              : styles.unselectedButton
          ]}
        >
          <Touchable
            onPress={() => handlePress('new')}
          >
            <View
              style={styles.buttonInner}
            >
              <ButtonText
                align="center"
                color={formProps.values[formKey] === 'new' ? 'white' : 'grass'}
              >
              I&apos;m a new
              </ButtonText>
              <ButtonText
                align="center"
                color={formProps.values[formKey] === 'new' ? 'white' : 'grass'}
              >
              grower
              </ButtonText>
            </View>
          </Touchable>
        </View>
        <View
          style={
            formProps.values[formKey] === 'old'
              ? styles.selectedButton
              : styles.unselectedButton
          }
        >
          <Touchable
            onPress={() => handlePress('old')}
          >
            <View style={styles.buttonInner}>
              <ButtonText
                align="center"
                color={formProps.values[formKey] === 'old' ? 'white' : 'grass'}
              >
            I&apos;ve done
              </ButtonText>
              <ButtonText
                align="center"
                color={formProps.values[formKey] === 'old' ? 'white' : 'grass'}
              >
            this before
              </ButtonText>
            </View>
          </Touchable>
        </View>
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
