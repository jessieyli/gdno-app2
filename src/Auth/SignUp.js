import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import GrowerTypeButtonGroup from './components/StyledButtonGroup';
import {
  Body, Header, Media, Touchable, StyledInput,
} from '../shared/components';
import {
  safeArea, centered, space, hitSlop, PROPSHAPES
} from '../shared/constants';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .label('First Name')
    .required('Required'),
  lastName: yup
    .string()
    .label('Last Name')
    .required('Required'),
  growerType: yup
    .string()
});

const styles = StyleSheet.create({
  safeArea,
  centered,
  viewPadding: {
    padding: space[2],
  },
  signUpHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: space[2],
  },
  signUpTitle: {
    paddingBottom: space[2],
  }
});

const SignUp = ({ navigation }) => {
  const defaultSettings = {
    firstName: '',
    lastName: '',
    growerType: '',
  };

  const handleSubmit = (values) => {
    navigation.navigate('SignUpEmail', { ...values });
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <Formik
        style={{ display: 'flex', flex: 1 }}
        initialValues={defaultSettings}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {fProps => (
          <Media style={styles.viewPadding}>
            <Media.Item>
              <View style={styles.signUpHeader} hitSlop={hitSlop}>
                <Touchable onPress="Welcome">
                  <View>
                    <Body color="medGray">← Step 1/3</Body>
                  </View>
                </Touchable>
                <Touchable onPress={fProps.handleSubmit} disabled={fProps.values.growerType === ''}>
                  <View hitSlop={hitSlop}>
                    <Body color="green" weight="bold" align="right">Next</Body>
                  </View>
                </Touchable>
              </View>
            </Media.Item>
            <Media.Body>
              <View style={styles.signUpTitle}>
                <Header>Sup! What do we call you?</Header>
              </View>
              <StyledInput
                label="First Name"
                formProps={fProps}
                formKey="firstName"
                placeholder="Catherine"
                autoFocus
              />
              <StyledInput
                label="Last Name"
                formProps={fProps}
                formKey="lastName"
                placeholder="Horwood"
              />
              <GrowerTypeButtonGroup
                formKey="growerType"
                formProps={fProps}
              />
            </Media.Body>
          </Media>
        )}
      </Formik>
    </SafeAreaView>
  );
};

SignUp.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default SignUp;
