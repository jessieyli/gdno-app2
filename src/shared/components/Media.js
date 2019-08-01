import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ss = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    flex: 0,
  },
  body: {
    flex: 1,
  }
});

const Media = ({ direction = 'column', style = {}, ...passedProps }) => (<View style={[ss[direction], style]} {...passedProps} />);
Media.propTypes = {
  direction: PropTypes.oneOf(['column', 'row']),
  style: PropTypes.object,
};

const Item = ({ style = {}, ...props }) => (<View style={[ss.item, style]} {...props} />);
Item.propTypes = { style: PropTypes.object };
const Body = ({ style = {}, ...props }) => (<View style={[ss.body, style]} {...props} />);
Body.propTypes = { style: PropTypes.object };

Media.Item = Item;
Media.Body = Body;

export default Media;
