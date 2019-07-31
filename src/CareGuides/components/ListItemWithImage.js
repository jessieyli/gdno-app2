import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { COLORS, space } from '../../shared/constants';
import { Body, Touchable, Type } from '../../shared/components';
import ThumbnailWithFallback from './ThumbnailWithFallback';
import SelectIndicator from './SelectIndicator';

const ListItemWithImage = ({
  item,
  selectable = false,
  selected = false,
  added = false,
  onPress,
  onRemove,
}) => {
  const ss = StyleSheet.create({
    outer: {
      paddingHorizontal: space[1],
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: space[2],
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    imageContainer: {
      width: 50,
    },
    text: {
      flex: 1,
      paddingHorizontal: space[1],
    },
    indicator: {
      width: 50,
    },
    removeButton: {
      paddingHorizontal: space[1],
      paddingVertical: space[0],
    },
    closeIcon: {
      padding: space[1],
    }
  });
  const handleOnPress = () => {
    onPress(item, selected);
  };
  const handleRemove = () => {
    onRemove(item);
  };

  return (
    <Touchable
      onPress={handleOnPress}
      accessibilityLabel={item.name}
      accessibilityRole="button"
      style={ss.outer}
    >
      <View style={ss.item}>
        <View style={ss.imageContainer}>
          <ThumbnailWithFallback imageUrl={item.imageUrl} name={item.name} />
        </View>
        <View style={ss.text}>
          <Body>
            {item.name}
          </Body>
        </View>
        {added && (
          <View style={ss.indicator}>
            <Body italic color="lightGray">Added</Body>
          </View>
        )}
        {selectable && !added
          && (
          <View style={ss.indicator}>
            <SelectIndicator selected={selected} />
          </View>
          )
        }
        {onRemove
          && (
          <Touchable onPress={handleRemove} style={ss.closeIcon}>
            <View style={ss.removeButton}>
              <Type size={24} color="gray">X</Type>
            </View>
          </Touchable>
          )
        }
      </View>
    </Touchable>
  );
};

/* eslint-disable react/require-default-props */
ListItemWithImage.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  added: PropTypes.bool,
};

export default ListItemWithImage;
