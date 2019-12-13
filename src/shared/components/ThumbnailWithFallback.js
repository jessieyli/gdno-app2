import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../constants';
import { DetailHeader } from './Type';

// TODO: Cache images
// https://docs.expo.io/versions/latest/guides/preloading-and-caching-assets/
const ThumbnailWithFallback = ({
  imageUrl,
  name,
  size = 50,
}) => {
  const ss = StyleSheet.create({
    container: {
      width: size,
      height: size,
    },
    image: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    placeholder: {
      backgroundColor: COLORS.grass,
      flex: 1,
      justifyContent: 'center',
    },
  });
  if (!imageUrl) {
    return (
      <View style={ss.container}>
        <View style={[ss.image, ss.placeholder]}>
          <DetailHeader color="white" align="center">{name.substring(0, 1)}</DetailHeader>
        </View>
      </View>
    );
  }
  return (
    <View style={ss.container}>
      <Image
        style={ss.image}
        source={{ uri: imageUrl }}
      />
    </View>
  );
};

ThumbnailWithFallback.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  size: PropTypes.number,
};

export default ThumbnailWithFallback;
