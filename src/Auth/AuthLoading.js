import React, { useEffect } from 'react';

import { PageLoader } from '../shared/components';
import { PROPSHAPES } from '../shared/constants';
import handleError from '../shared/data/handleError';
import { getSettings } from './data';

const AuthLoading = ({ navigation }) => {
  const getSavedUser = () => {
    getSettings()
      .then((settings) => {
        navigation.navigate(settings.uid ? 'App' : 'Auth');
      })
      .catch((e) => {
        handleError(e);
        navigation.navigate('Auth');
      });
  };

  useEffect(() => {
    setTimeout(getSavedUser, 1000);
  }, [navigation]);

  return (
    <PageLoader label="Loading Gardenio…" />
  );
};

AuthLoading.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default AuthLoading;
