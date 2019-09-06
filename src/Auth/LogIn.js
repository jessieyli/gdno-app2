import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import {
  Button, ErrorState, Header, Media, Touchable, StyledInput, ButtonText
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

const LogIn = ({ navigation }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [loginTries, setLoginTries] = useState(0);

  const handleSubmit = (values) => {
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then((account) => {
        console.log({ account });
        saveUserAsSettings(account);
        navigation.navigate('Home');
      })
      .catch((e) => {
        setLoading(null);
        setLoginTries(loginTries + 1);
        setError(e.message);
      });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          details={error}
          callToAction={loginTries > 1 ? 'Reset Password' : 'Back to Log In'}
          action={() => {
            if (loginTries > 2) {
              navigation.navigate('ResetPassword');
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
            <Media.Body>
              <View style={styles.signUpTitle}>
                <Header>Good to see you again!</Header>
              </View>
              <StyledInput
                label="Email"
                formProps={fProps}
                formKey="email"
                autoFocus
              />
              <StyledInput
                label="Password"
                formProps={fProps}
                formKey="password"
                secureTextEntry
              />
              <Button color="green" onPress={fProps.handleSubmit}>Log In</Button>
            </Media.Body>
            <Media.Item>
              <Touchable onPress="SignUp">
                <View style={styles.logInButton} hitSlop={hitSlop}>
                  <ButtonText color="green" weight="bold" align="left">Create an account</ButtonText>
                </View>
              </Touchable>
            </Media.Item>
          </Media>
        )}
      </Formik>
    </SafeAreaView>
  );
};

LogIn.propTypes = {
  navigation: PROPSHAPES.navigation,
};

export default LogIn;
