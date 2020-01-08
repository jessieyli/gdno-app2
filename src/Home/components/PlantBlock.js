import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, space } from '../../shared/constants';
import { ThumbnailWithFallback, Type } from '../../shared/components';

const styles = StyleSheet.create({
  plantBlock: {
    width: 120,
    height: 150,
    paddingHorizontal: space[2],
    paddingVertical: space[2],
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    flexDirection: 'column',
    alignItems: 'center',
  },
  thumbnail: {
    marginBottom: space[2],
  }
});

const PlantBlock = ({
  style,
  nickname,
  name,
  imageUrl,
  ...passedProps,
}) => (
  <View style={[styles.plantBlock, style]} {...passedProps}>
    <View style={styles.thumbnail}>
      <ThumbnailWithFallback
        size={72}
        imageUrl={imageUrl}
        name={nickname || name}
      />
    </View>
    <Type weight="bold" color="gray" align="center" size={14} lineHeight={1}>
      {nickname || name}
    </Type>
    {!!nickname && <Type italic align="center" color="medGray" size={12}>{name}</Type>}
  </View>
);

export default PlantBlock;
