import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Line } from 'react-native-svg';

import { COLORS } from '../constants';

const Cross = ({
  height = 16,
  strokeWidth = 2,
  color = 'gray',
}) => (
  <Svg height={height} width={height}>
    <Line x1="0" y1="0" x2={height} y2={height} stroke={COLORS[color]} strokeWidth={strokeWidth} />
    <Line x1={height} y1="0" x2="0" y2={height} stroke={COLORS[color]} strokeWidth={strokeWidth} />
  </Svg>
);

Cross.propTypes = {
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
};

export default Cross;
