import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import handleError from '../shared/data/handleError';
import {
  PROPSHAPES, COLORS, space, centered, padded
} from '../shared/constants';
import {
  Button, SectionTitle, ErrorState, Media
} from '../shared/components';

import {
  getPlantData, loadStoredPlants, getAndSavePlantsToStorage
} from './data';
import PlantList from './components/PlantList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  main: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  savedPlants: {
    flex: 1,
  },
  centered,
  padded,
  bottomButton: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    padding: space[2],
  },
});

const AddCareGuidesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [plants, setPlants] = useState([]);
  const [storedPlants, setStoredPlants] = useState([]);
  const [selectedPlantIds, setSelectedPlantIds] = useState([]);

  const fetchAllPlants = () => {
    getPlantData()
      .then((plantList) => {
        setPlants(plantList);
      })
      .catch((err) => {
        handleError(err);
        setError(true);
        setLoading(false);
      });
  };

  const fetchStoredPlants = async () => {
    try {
      const downloadedPlants = await loadStoredPlants();
      setStoredPlants(downloadedPlants);
    } catch (err) {
      handleError(err);
    }
  };

  const handlePlantSelect = (plant) => {
    const index = selectedPlantIds.indexOf(plant.id);
    const selected = [...selectedPlantIds];
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(plant.id);
    }
    setSelectedPlantIds(selected);
  };

  const handleDownloadSelectedGuides = () => {
    setError(false);
    setLoading(true);
    getAndSavePlantsToStorage(selectedPlantIds)
      .then(() => {
        setLoading(false);
        setSelectedPlantIds([]);
        navigation.goBack();
      })
      .catch((err) => {
        handleError(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllPlants();
    fetchStoredPlants();

    return () => {
      setLoading(false);
      setError(false);
    };
  }, []);

  if (error) return <ErrorState details="We're having issues gathering the plant data. Please try again later." />;

  return (
    <Media style={styles.container}>
      <Media.Body style={styles.plantList}>
        {loading || !plants
          ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={COLORS.magenta} />
            </View>
          ) : (
            <PlantList
              plants={plants}
              onPress={handlePlantSelect}
              selectable
              style={styles.padded}
              selectedList={selectedPlantIds}
              addedList={storedPlants.map(p => p.id)}
              footer={(<View style={{ paddingVertical: space[3] }}><SectionTitle align="center">More coming soon.</SectionTitle></View>)}
            />
          )
        }
      </Media.Body>
      <Media.Item style={styles.bottomButton}>
        <Button
          disabled={loading || selectedPlantIds.length === 0}
          onPress={handleDownloadSelectedGuides}
        >
          {`Download (${selectedPlantIds.length}) ${selectedPlantIds.length === 1 ? 'Care Guide' : 'Care Guides'}`}
        </Button>
      </Media.Item>
    </Media>
  );
};

AddCareGuidesScreen.propTypes = {
  navigation: PROPSHAPES.navigation,
};

export default AddCareGuidesScreen;
