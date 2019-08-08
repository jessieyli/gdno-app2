import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';

import { space } from '../../shared/constants';
import { NavText, Touchable, Type } from '../../shared/components';
import ThumbnailWithFallback from './ThumbnailWithFallback';

const ss = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: space[0],
    paddingTop: Platform.OS === 'ios' ? space[0] : StatusBar.currentHeight + space[0],
    alignItems: 'center',
  },
  backButton: {
    paddingHorizontal: space[2],
  },
  button: {
    width: 30,
    alignItems: 'flex-start',
  },
  title: {
    paddingLeft: space[1],
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});

const TitleBar = ({
  showBackButton = true,
  onClickBack = () => {},
  title,
  imageUrl,
  showImage = true,
}) => (
  <View style={ss.container}>
    {showBackButton
      && (
        <Touchable onPress={onClickBack}>
          <View style={ss.backButton}>
            <Type color="gray" size={30}>{'<'}</Type>
          </View>
        </Touchable>
      )
    }
    <View style={ss.main}>
      {showImage && <ThumbnailWithFallback imageUrl={imageUrl} name={title} />}
      <View style={ss.title}>
        {title && <NavText>{title}</NavText>}
      </View>
    </View>
    <View style={ss.button} />
  </View>
);

TitleBar.propTypes = {
  showBackButton: PropTypes.bool,
  onClickBack: PropTypes.func,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  showImage: PropTypes.bool,
};

export default TitleBar;
