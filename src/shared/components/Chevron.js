import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Polyline } from 'react-native-svg';

import { COLORS } from '../constants';

const Chevron = ({
  pointing = 'right',
  height = 18,
  strokeWidth = 2,
  color = 'gray',
}) => {
  let points = `1,1 ${height / 2},${height / 2} 1,${height}`;
  if (pointing === 'left') {
    points = `${height / 2},1 1,${height / 2} ${height / 2},${height}`;
  }
  return (
    <Svg height={height} width={height / 2}>
      <Polyline
        points={points}
        fill="none"
        stroke={COLORS[color]}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

Chevron.propTypes = {
  pointing: PropTypes.oneOf(['right', 'left']),
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
};

export default Chevron;
