import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Header } from '../shared/components';
import { safeArea } from '../shared/constants';

const style = StyleSheet.create({
  safeArea,
});

const ResetPassword = () => (
  <SafeAreaView style={style.safeArea}>
    <Header>Reset Password Form</Header>
  </SafeAreaView>
);

export default ResetPassword;
