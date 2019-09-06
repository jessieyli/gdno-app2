import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import {
  Body, ErrorState, Header, Media, Touchable, StyledInput, ButtonText, PageLoader,
} from '../shared/components';
import {
  safeArea, centered, space, hitSlop, PROPSHAPES
} from '../shared/constants';
import { saveUserAsSettings } from './data';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .label('Email')
    .required('Required'),
  password: yup
    .string()
    .label('Password')
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

const logInFail = 'We weren\'t able to log you in automatically.';

const SignUpEmail = ({ navigation }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    setLoading('Creating account…');
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((account) => {
        const user = firebase.auth().currentUser;
        console.log({ user });
        console.log({ account });
        saveUserAsSettings(user)
          .then(() => {
            navigation.navigate('SignUpLocation');
          })
          .catch(() => {
            setLoading(null);
            setError(logInFail);
          });
      })
      .catch((e) => {
        setLoading(null);
        setError(e.message);
      });
  };

  if (loading) {
    return (<PageLoader label={loading} />);
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          details={error}
          callToAction={error === logInFail ? 'Log In' : 'Try Again'}
          action={() => {
            if (error === logInFail) {
              navigation.navigate('LogIn');
            } else {
              setError(null);
            }
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <Formik
        style={{ display: 'flex', flex: 1 }}
        initialValues={{
          email: '',
          password: '',
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
                <Body color="medGray">Step 2/4</Body>
                <Touchable onPress={fProps.handleSubmit}>
                  <View>
                    <Body color="green" weight="bold" align="right">Next</Body>
                  </View>
                </Touchable>
              </View>
            </Media.Item>
            <Media.Body>
              <View style={styles.signUpTitle}>
                <Header>Alright then. Let&apos;s make this thing official</Header>
              </View>
              <StyledInput
                label="Email"
                formProps={fProps}
                formKey="email"
                placeholder="c.horwood@example.com"
                autoFocus
              />
              <StyledInput
                label="Password"
                formProps={fProps}
                formKey="password"
                secureTextEntry
              />
            </Media.Body>
            <Media.Item>
              <Touchable onPress="LogIn">
                <View style={styles.logInButton} hitSlop={hitSlop}>
                  <ButtonText color="green" weight="bold" align="left">I have an account</ButtonText>
                </View>
              </Touchable>
            </Media.Item>
          </Media>
        )}
      </Formik>
    </SafeAreaView>
  );
};

SignUpEmail.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default SignUpEmail;
