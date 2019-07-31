import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  PROPSHAPES, COLORS, space, centered, padded
} from '../shared/constants';
import {
  Button, Header, SectionTitle, ErrorState
} from '../shared/components';

import {
  getPlantData, loadStoredPlants, getAndSavePlantsToStorage, removePlantsByName
} from './data';
import CareGuideEmptyState from './components/CareGuideEmptyState';
import PlantList from './components/PlantList';
import StandardModal from './components/StandardModal';

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

class CareGuidesScreen extends React.Component {
  state = {
    savedPlants: [],
    loading: false,
    error: false,
    plantList: [],
    selectedPlantIds: [],
    modalVisible: false,
  };

  componentDidMount() {
    this.loadPlants();
  }

  handleConfirmDelete = (plantName) => {
    removePlantsByName([plantName])
      .then(() => {
        this.loadPlants();
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  handlePlantRemove = (plant) => {
    Alert.alert(
      `Remove ${plant.Herb}?`,
      'If you delete this care guide you can always add it back later.',
      [
        {
          text: 'Nevermind',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => this.handleConfirmDelete(plant.Herb) },
      ],
    );
  }

  handlePlantSelect = (plant) => {
    const { selectedPlantIds, savedPlants } = this.state;
    const index = selectedPlantIds.indexOf(plant.id);
    const isSaved = savedPlants.map(p => p.id).indexOf(plant.id) >= 0;
    const selected = [...selectedPlantIds];
    if (isSaved) return;
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(plant.id);
    }
    this.setState({ selectedPlantIds: selected });
  }

  handlePlantPress = (plant) => {
    this.props.navigation.navigate('CareGuide', { name: plant.name });
  }

  loadPlants = async () => {
    this.setState({ loading: true });
    try {
      const downloadedPlants = await loadStoredPlants();
      this.setState({
        savedPlants: downloadedPlants,
        loading: false,
      });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  }

  getAndSetPlantData = () => {
    getPlantData()
      .then((plantList) => {
        this.setState({
          plantList,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ modalVisible: false, loading: false, error: true });
      });
  }

  handleAddPlantsPress = () => {
    this.setState(
      { loading: true, error: false, modalVisible: true },
      this.getAndSetPlantData()
    );
  }

  handleDownloadSelectedGuides = () => {
    const { selectedPlantIds } = this.state;
    this.setState({ loading: true });
    getAndSavePlantsToStorage(selectedPlantIds)
      .then(() => {
        this.loadPlants();
        this.setState({
          modalVisible: false,
          loading: true,
          selectedPlantIds: [],
        });
      })
      .catch(() => {
        this.setState({ modalVisible: false, error: true });
      });
  }

  render() {
    const {
      savedPlants,
      loading,
      error,
      plantList,
      modalVisible,
      selectedPlantIds,
    } = this.state;

    if (savedPlants.length === 0 && !modalVisible && !loading) {
      return (
        <View style={styles.centered}>
          <CareGuideEmptyState onButtonClick={this.handleAddPlantsPress} />
        </View>
      );
    }

    if (error) return <ErrorState details="We're having issues gathering the plant data. Try again later." />;

    return (
      <View style={styles.container}>
        <StandardModal
          visible={modalVisible}
          onClose={() => this.setState({ modalVisible: false })}
          footer={(
            <View style={styles.bottomButton}>
              <Button
                disabled={loading || selectedPlantIds.length === 0}
                onPress={this.handleDownloadSelectedGuides}
              >
                {`Download (${selectedPlantIds.length}) ${selectedPlantIds.length === 1 ? 'Care Guide' : 'Care Guides'}`}
              </Button>
            </View>
          )}
        >
          {loading
            ? (
              <View style={styles.centered}>
                <ActivityIndicator size="large" color={COLORS.magenta} />
              </View>
            ) : (
              <PlantList
                plants={plantList}
                onPress={this.handlePlantSelect}
                selectable
                style={styles.padded}
                selectedList={selectedPlantIds}
                addedList={savedPlants.map(p => p.id)}
                header={(<Header>Select the plant(s) you&apos;re growing</Header>)}
                footer={(<View style={{ paddingVertical: space[3] }}><SectionTitle align="center">More coming soon.</SectionTitle></View>)}
              />
            )
        }
        </StandardModal>
        <View style={styles.savedPlants}>
          <PlantList
            style={{ paddingHorizontal: space[2] }}
            plants={savedPlants}
            onPress={this.handlePlantPress}
            onRemove={this.handlePlantRemove}
          />
        </View>
        <View style={styles.padded}>
          <Button onPress={this.handleAddPlantsPress}>
            Add More Plants
          </Button>
        </View>
      </View>
    );
  }
}

CareGuidesScreen.propTypes = {
  navigation: PROPSHAPES.navigation,
};

export default CareGuidesScreen;
