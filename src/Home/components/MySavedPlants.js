import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import handleError from '../../shared/data/handleError';
import { Touchable, PageLoader, ErrorState } from '../../shared/components';
import { space } from '../../shared/constants';
import PlantBlock from './PlantBlock';
import { loadStoredPlants } from '../data';

const styles = StyleSheet.create({
  container: {
    padding: space[2],
  },
  plants: {
    marginVertical: space[2],
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap'
  },
  spaced: {
    marginRight: space[2],
    marginBottom: space[2],
  }
});

const ERROR_THRESHOLD = 2;

const MySavedPlants = ({
  style,
  navigate,
  signout,
  ...passedProps,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    setLoading(true);
    loadStoredPlants()
      .then((downloadedPlants) => {
        setPlants(downloadedPlants);
        console.log(downloadedPlants);
        setLoading(false);
      })
      .catch((e) => {
        handleError(e);
        setLoading(false);
        setError(true);
      });
    return () => { setError(false); setErrorCount(0); setLoading(false); };
  }, []);

  const loadPlants = async () => {
    setLoading(true);
    setError(false);
    try {
      const downloadedPlants = await loadStoredPlants();
      setPlants(downloadedPlants);
      setLoading(false);
    } catch (e) {
      handleError(e);
      setError(true);
      setLoading(false);
    }
  };

  const handleErrorAction = () => {
    if (errorCount < ERROR_THRESHOLD) {
      loadPlants();
    } else {
      signout();
      navigate('Welcome');
    }
    setErrorCount(errorCount + 1);
  };

  if (loading) {
    return (<PageLoader />);
  }

  if (error) {
    const actionText = errorCount < ERROR_THRESHOLD ? 'Try Again' : 'Log out';
    return (<ErrorState callToAction={actionText} action={handleErrorAction} />);
  }

  const handlePlantPress = name => () => {
    navigate('CareGuide', { name });
  };

  return (
    <ScrollView horizontal style={[styles.plants, style]} {...passedProps}>
      {plants.map(plant => (
        <Touchable onPress={handlePlantPress(plant.name)} key={plant.name}>
          <PlantBlock
            style={styles.spaced}
            name={plant.name}
            nickname={plant.nickname || ''}
            imageUrl={plant.images ? plant.images[0].thumbnails.large.url : ''}
          />
        </Touchable>
      ))}
    </ScrollView>
  );
};

MySavedPlants.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default MySavedPlants;
