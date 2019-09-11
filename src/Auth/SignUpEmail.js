import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Body, ErrorState, Header, Media, Touchable, StyledInput, ButtonText, PageLoader,
} from '../shared/components';
import {
  safeArea, centered, space, hitSlop, PROPSHAPES
} from '../shared/constants';
import { useAuth } from '../shared/use-auth';
import handleError from '../shared/data/handleError';
import { addUserSettings, storeUser } from './data';

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

const SignUpEmail = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const { params } = navigation.state;

  useEffect(() => {
    if (loading && !!auth.user) {
      addUserSettings(auth.user.uid, {
        ...auth.user,
        ...params,
      })
        .then(() => {
          storeUser(auth.user);
          navigation.navigate('SignUpLocation');
        })
        .catch((e) => {
          handleError(e);
          setLoading(false);
          setError('Something went wrong. Please try again later.');
        });
    }
  }, [loading, auth, params]);

  const handleSubmit = async (values) => {
    setLoading(true);
    auth.signup(values.email, values.password)
      .catch((e) => {
        handleError(e);
        setLoading(false);
        setError(e.message);
      });
  };

  if (loading) {
    return (<PageLoader />);
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          details={error}
          callToAction="Okay"
          action={() => setError(null)}
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
                <Body color="medGray">Step 2/3</Body>
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
