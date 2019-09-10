import React, { useEffect, useState } from 'react';

import { PageLoader } from '../shared/components';
import { PROPSHAPES } from '../shared/constants';
import handleError from '../shared/data/handleError';
import { getStoredUser } from './data';
import { useAuth } from '../shared/use-auth';

const AuthLoading = ({ navigation }) => {
  const auth = useAuth();

  const checkLoginState = () => {
    getStoredUser()
      .then((uid) => {
        navigation.navigate(uid ? 'App' : 'Auth');
        // TODO: wait for login
      })
      .catch((e) => {
        handleError(e);
        navigation.navigate('Auth');
      });
  };

  useEffect(() => {
    checkLoginState();
  }, []);

  useEffect(() => {
    if (auth.user) {
      navigation.navigate('App');
    }
  }, [auth]);

  return (
    <PageLoader label="Loading Gardenio…" />
  );
};

AuthLoading.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default AuthLoading;
