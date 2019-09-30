import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, View, StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { isEmpty } from 'lodash';

import {
  space, safeArea, PROPSHAPES, centered
} from '../shared/constants';
import {
  StyledInput, Button, ErrorState, PageLoader, Type
} from '../shared/components';
import { addUserSettings } from './data';
import handleError from '../shared/data/handleError';
import { useAuth } from '../shared/use-auth';


const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .label('First Name'),
  lastName: yup
    .string()
    .label('Last Name'),
  email: yup
    .string()
    .label('Email')
    .email(),
  zipcode: yup
    .number()
    .label('Zipcode'),
});

const ss = StyleSheet.create({
  container: {
    padding: space[2],
  },
  centered,
  safeArea,
});

const SettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = useAuth();
  const initialSettings = { ...navigation.state.params };

  const submitSettings = (values) => {
    const { user } = auth;
    setLoading(true);
    addUserSettings(user.uid, values)
      .then(() => {
        setLoading(false);
        navigation.navigate('Settings');
      })
      .catch((err) => {
        handleError(err);
        setLoading(false);
        setError(err.message);
      });
  };

  if (error || isEmpty(initialSettings)) {
    return <ErrorState title="We couldn't load your settings" details={error} />;
  }

  if (loading) {
    return (
      <SafeAreaView style={ss.safeArea}>
        <PageLoader details="Updating your settings…" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ss.safeArea}>
      <View style={ss.container}>
        <Formik
          initialValues={initialSettings}
          validationSchema={validationSchema}
          onSubmit={values => submitSettings(values)}
        >
          {fProps => (
            <View>
              <StyledInput
                label="First Name"
                formProps={fProps}
                formKey="firstName"
                autoFocus
              />
              <StyledInput
                label="Last Name"
                formProps={fProps}
                formKey="lastName"
              />
              <StyledInput
                label="Email"
                formProps={fProps}
                formKey="email"
                keyboardType="email-address"
              />
              <StyledInput
                isEditing
                label="Zipcode"
                formProps={fProps}
                formKey="zipcode"
                keyboardType="number-pad"
              />
              {true // || userPermissions.hasFlag('NOTIFICATIONS')
              && (
              <React.Fragment>
                <StyledInput
                  isEditing
                  label="Water Time"
                  formProps={fProps}
                  formKey="waterTime"
                />
                <Type size={10} color="medGray" weight="bold">
                  When you have notifications on, this is the time of day we'll
                   remind you to do things in your garden.
                </Type>
              </React.Fragment>
              )
              }

              <Button color="cyan" onPress={fProps.handleSubmit}>Save</Button>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

SettingsScreen.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default SettingsScreen;
