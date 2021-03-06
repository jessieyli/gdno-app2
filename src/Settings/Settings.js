import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, StyleSheet, Alert
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import SettingDisplay from './components/SettingDisplay';
import { space, safeArea, PROPSHAPES } from '../shared/constants';
import { PageLoader, StyledInput, Button } from '../shared/components';
import { defaultSettings, getSettings } from './data';
import { clearKeys, clearSettings } from '../shared/data/localStorage';
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
  safeArea,
});

const SettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);
  const [isEditing, setIsEditing] = useState(false);
  const auth = useAuth();

  const loadSettings = (user) => {
    getSettings(user)
      .then((userSettings) => {
        const s = userSettings.data();
        const displaySettings = {
          name: `${s.firstName} ${s.lastName}`,
          email: user.email,
          ...s,
        };
        setSettings(displaySettings);
        setLoading(false);
      })
      .catch((error) => {
        handleError(error);
        setLoading(false);
      });
  };

  useEffect(
    () => {
      if (loading && auth.user) {
        loadSettings(auth.user);
      }
    },
    [auth, loading],
  );

  const handleSignOut = () => {
    auth.signout()
      .then(() => {
        clearSettings(['S_uid']);
        navigation.navigate('Welcome');
      });
  };

  const handlePressClear = () => {
    Alert.alert(
      'Are you sure?',
      'Continuing will clear all your user data and saved care guides',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => clearKeys()
            .then(() => loadSettings())
            .finally(() => setIsEditing(false))
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView>
        <Button color="danger" onPress={handleSignOut}>Sign Out</Button>
        <PageLoader details="Loading settings…" />
      </SafeAreaView>
    );
  }

  if (isEditing) {
    return (
      <SafeAreaView style={ss.safeArea}>
        <View style={ss.container}>
          <Formik
            initialValues={settings}
            validationSchema={validationSchema}
            onSubmit={() => {
              // submitSettings(values)
              //   .then(() => {
              //     setSettings(values);
              //   })
              //   .finally(() => {
              //     setIsEditing(false);
              //   });
            }}
          >
            {fProps => (
              <View>
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
                <StyledInput
                  label="Email"
                  formProps={fProps}
                  formKey="email"
                  placeholder="potato@potato.com"
                  keyboardType="email-address"
                />
                <StyledInput
                  isEditing
                  label="Zipcode"
                  formProps={fProps}
                  formKey="zipcode"
                  placeholder="78702"
                  keyboardType="number-pad"
                />
                <Button color="cyan" onPress={fProps.handleSubmit}>Save</Button>
              </View>
            )}
          </Formik>
          <View style={{ marginVertical: space[2] }}>
            <Button color="danger" onPress={handleSignOut}>Sign Out</Button>
            <Button inverted color="danger" onPress={handlePressClear}>Clear All Plant & Settings Data</Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const fullName = (`${settings.firstName || ''} ${settings.lastName || ''}`).trim();
  return (
    <SafeAreaView style={ss.safeArea}>
      <View style={ss.container}>
        <SettingDisplay
          label="Name"
          value={fullName}
        />
        <SettingDisplay
          label="Email"
          value={settings.email}
        />
        <SettingDisplay
          label="Zipcode"
          value={settings.zipcode}
        />
        <Button align="left" inverted onPress={() => setIsEditing(true)}>Edit</Button>
      </View>
    </SafeAreaView>
  );
};

SettingsScreen.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default SettingsScreen;
