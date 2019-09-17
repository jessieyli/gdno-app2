import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, detailsScreensArray, space } from '../../shared/constants';
import { NavText, Touchable, Media } from '../../shared/components';

const ss = StyleSheet.create({
  subnav: {
    flexDirection: 'row',
  },
  navItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingVertical: space[2],
    paddingHorizontal: space[0],
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNav: {
    borderBottomColor: COLORS.grass,
  }
});

const SubNavMenu = ({
  onPress,
  active,
}) => (
  <Media style={ss.subnav}>
    {detailsScreensArray.map(screen => (
      <Media.Body key={screen}>
        <Touchable onPress={() => onPress(screen)}>
          <View style={[ss.navItem, active === screen ? ss.activeNav : {}]}>
            <NavText color={active === screen ? 'grass' : 'medGray'}>
              {screen}
            </NavText>
          </View>
        </Touchable>
      </Media.Body>
    ))}
  </Media>
);

SubNavMenu.propTypes = {
  onPress: PropTypes.func,
  active: PropTypes.string,
};

export default SubNavMenu;
