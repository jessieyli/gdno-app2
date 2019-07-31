import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../constants';

const Type = ({
  weight = 'medium',
  color = 'gray',
  italic = false,
  size = 16,
  children,
  uppercase = false,
  style = {},
  align = 'left',
}) => {
  if (!children) return null;
  const fontSelect = italic ? `${weight}Italic` : weight;
  const textStyle = StyleSheet.create({
    textStyle: {
      // ...FONTS[fontSelect],
      color: COLORS[color],
      lineHeight: size * 1.5,
      fontSize: size,
      textAlign: align,
    }
  });
  return (
    <Text style={[textStyle.textStyle, style]}>
      {uppercase ? children.toUpperCase() : children}
    </Text>
  );
};

/* eslint-disable react/require-default-props */
Type.propTypes = {
  weight: PropTypes.oneOf(['medium', 'bold', 'light', 'black']),
  color: PropTypes.oneOf([
    'cyan',
    'grass',
    'green',
    'royal',
    'magenta',
    'tangerine',
    'gray',
    'medGray',
    'lightishGray',
    'lightGray',
    'white',
    'danger',
    'warning',
    'info',
  ]),
  uppercase: PropTypes.bool,
  italic: PropTypes.bool,
  size: PropTypes.number,
  children: PropTypes.string.isRequired,
  align: PropTypes.oneOf([
    'left',
    'center',
    'right',
  ]),
  style: PropTypes.object,
};

export const Header = props => (<Type weight="bold" size={36} {...props} />);
export const DetailHeader = props => (<Type weight="medium" size={24} {...props} />);
export const FormInput = props => (<Type weight="light" size={24} {...props} />);
export const SubHead = props => (<Type weight="light" size={18} {...props} />);
export const Body = props => (<Type weight="light" size={16} {...props} />);
export const SectionTitle = props => (<Type weight="medium" size={16} {...props} />);
export const NavText = props => (<Type weight="black" size={12} {...props} />);
export const TextHeader = props => (<Type weight="bold" size={12} {...props} />);
export const FormLabel = props => (<Type weight="bold" size={12} color="lightishGray" uppercase style={{ letterSpacing: 1 }} {...props} />);
export const ButtonText = props => (<Type weight="bold" size={12} color="white" align="center" uppercase style={{ letterSpacing: 1 }} {...props} />);

export default Type;
