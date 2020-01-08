import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import { COLORS } from '../constants';

const PersonIcon = ({
  height = 18,
  color = 'gray',
  ...props
}) => (
  <Svg width={height * 0.933} height={height} viewBox="0 0 97 104" {...props}>
    <Path
      d="M49 0c16.568 0 30 13.432 30 30 0 8.405-3.457 16.003-9.026 21.45 15.735 5.369 26.803 16.536 27.023 30.137L97 82v13.13c0 1.455-.278 2.982-.904 4.36-1.172 2.575-3.493 4.51-6.751 4.51H8.718C4.119 104 0 99.536 0 95.13V82c0-14.003 11.482-25.48 27.773-30.8C22.353 45.772 19 38.278 19 30 19 13.432 32.432 0 49 0zm-.5 60c-20.35 0-36.18 10.296-36.495 21.655L12 82v10h73V82l-.005-.345C84.681 70.295 68.85 60 48.5 60zm.5-48c-9.94 0-18 8.06-18 18s8.06 18 18 18 18-8.06 18-18-8.06-18-18-18z"
      fill={COLORS[color]}
    />
  </Svg>
);

PersonIcon.propTypes = {
  height: PropTypes.number,
  color: PropTypes.string,
};

export default PersonIcon;
