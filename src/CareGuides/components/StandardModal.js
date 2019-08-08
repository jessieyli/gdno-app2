import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

import { COLORS, space, safeArea } from '../../shared/constants';
import { SectionTitle, Touchable, Type } from '../../shared/components';

const ss = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: COLORS.white,
  },
  body: {
    flex: 1,
  },
  buttonContainer: {
    width: 50,
  },
  horizontal: {
    paddingHorizontal: space[2],
  },
  safeArea,
});

const StandardModal = ({
  visible,
  onClose,
  title = '',
  children,
  header,
  footer,
}) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={ss.main}>
      <SafeAreaView style={ss.safeArea}>
        {header || (
        <View style={ss.horizontal}>
          <Touchable onPress={onClose}>
            <Type color="gray" size={30}>X</Type>
          </Touchable>
          {!!title && <SectionTitle uppercase color="medGray">{title}</SectionTitle>}
        </View>
        )}
        <View style={ss.body}>
          {children}
        </View>
        {footer && (
        <View>
          {footer}
        </View>
        )}
      </SafeAreaView>
    </View>
  </Modal>
);

StandardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
};

StandardModal.defaultProps = {
  header: null,
  footer: null,
};

export default StandardModal;
