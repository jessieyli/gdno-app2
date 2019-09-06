import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Body, Header, Media, Touchable, StyledInput,
} from '../shared/components';
import { safeArea, centered, space } from '../shared/constants';
import { saveSettings } from './data';

const validationSchema = yup.object().shape({
  zipcode: yup
    .number()
    .nullable()
    .label('Zipcode')
    .required('Required'),
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

const SignUpLocation = ({ navigation }) => {
  const handleSubmit = (values) => {
    saveSettings(values)
      .then(() => {
        navigation.navigate('Home');
      });
  };
  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <Formik
        style={{ display: 'flex', flex: 1 }}
        initialValues={{
          zipcode: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {fProps => (
          <Media style={styles.viewPadding}>
            <Media.Item>
              <View style={styles.signUpHeader}>
                <Body color="medGray">Step 3/3</Body>
                <Touchable onPress={fProps.handleSubmit}>
                  <View>
                    <Body color="green" weight="bold" align="right">Finish</Body>
                  </View>
                </Touchable>
              </View>
            </Media.Item>
            <Media.Body>
              <View style={styles.signUpTitle}>
                <Header>What&apos;s your zipcode?</Header>
                <Body>
                  Knowing your zipcode allows us to give you the most relevant
                   updates and advice, without needing to know where you are at
                    all times 👀
                </Body>
              </View>
              <StyledInput
                label="Zipcode"
                formProps={fProps}
                formKey="zipcode"
                placeholder="78702"
                autoFocus
              />
            </Media.Body>
          </Media>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUpLocation;
