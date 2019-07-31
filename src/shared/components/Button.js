import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { COLORS, space, borderWide } from '../constants';
import { ButtonText } from './Type';
import Touchable from './Touchable';

const Button = ({
  accessibilityLabel,
  color = 'grass',
  onPress,
  children,
  inverted = false,
  disabled = false,
  transparent = false,
  style = {},
  align = 'center',
}) => {
  const buttonColor = disabled ? 'lightGray' : color;
  const ss = StyleSheet.create({
    buttonStyle: {
      paddingVertical: inverted ? space[2] : space[2] + (borderWide * 2),
      paddingHorizontal: inverted ? space[1] : space[1] + (borderWide * 2),
      borderRadius: borderWide,
      borderWidth: inverted ? borderWide : 0,
      borderColor: COLORS[buttonColor],
      ...style,
      backgroundColor: inverted ? COLORS.white : COLORS[buttonColor],
    }
  });
  const accessibilityLabelText = accessibilityLabel || children;
  const accessibilityStates = disabled ? ['disabled'] : [];
  let textColor = 'white';
  if (inverted || transparent) textColor = buttonColor;
  if (transparent) {
    return (
      <Touchable
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={accessibilityLabelText}
        accessibilityRole="button"
        accessibilityStates={accessibilityStates}
      >
        <View style={style}>
          <ButtonText color={textColor} align={align}>
            {children}
          </ButtonText>
        </View>
      </Touchable>
    );
  }
  return (
    <Touchable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabelText}
      accessibilityRole="button"
      accessibilityStates={accessibilityStates}
    >
      <View style={ss.buttonStyle}>
        <ButtonText color={textColor} align={align}>
          {children}
        </ButtonText>
      </View>
    </Touchable>
  );
};

/* eslint-disable react/require-default-props */
Button.propTypes = {
  color: PropTypes.oneOf([
    'cyan',
    'grass',
    'green',
    'royal',
    'magenta',
    'tangerine',
    'gray',
    'medGray',
    'lightGray',
  ]),
  onPress: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
  children: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  disabled: PropTypes.bool,
  transparent: PropTypes.bool,
  inverted: PropTypes.bool,
  style: PropTypes.object,
};

export const ClearButton = props => (<Button transparent color="gray" {...props} />);

export default Button;
