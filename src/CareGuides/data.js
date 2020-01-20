import * as firebase from 'firebase';
import 'firebase/firestore';

import handleError from '../shared/data/handleError';
import {
  retrieveParsedDataOfType,
  storePlant,
  storeSpecies,
  retrievePlant,
  retrieveSpecies,
  updatePlant,
  deletePlant,
} from '../shared/data/localStorage';

export const getPlantList = () => {
  const query = firebase.firestore().collection('plantList').orderBy('name');
  return query.get().then((querySnapshot) => {
    const plantList = [];
    querySnapshot.forEach((doc) => {
      const fields = doc.data();
      plantList.push({
        id: doc.id,
        ...fields,
      });
    });
    return plantList;
  }).catch((e) => {
    handleError(e);
    throw e;
  });
};

export const loadStoredPlants = async () => {
  try {
    const plants = await retrieveParsedDataOfType('plant');
    return plants;
  } catch (e) {
    handleError(e);
    throw e;
  }
};

const updateUserPlantInDb = (userId, id, updates) => firebase
  .firestore()
  .collection('users')
  .doc(userId)
  .collection('my_plants')
  .doc(id)
  .update(updates)
  .then(() => updates);

const deleteUserPlantInDb = (userId, id) => firebase
  .firestore()
  .collection('users')
  .doc(userId)
  .collection('my_plants')
  .doc(id)
  .delete()
  .then(() => true);

const updateSavedPlant = (plantId, updates) => updatePlant(plantId, updates);

const removeSavedPlant = plantId => deletePlant(plantId);

export const updatePlantInfoById = async (
  userId,
  id,
  updates,
) => updateUserPlantInDb(userId, id, updates)
  .then(() => updateSavedPlant(id, updates))
  .catch((err) => {
    handleError(err);
    throw err;
  });

export const deletePlantById = async (userId, id) => deleteUserPlantInDb(userId, id)
  .then(() => removeSavedPlant(id))
  .catch((err) => {
    handleError(err);
    throw err;
  });

export const getPlantInfoById = async (id) => {
  let plant;
  let species;
  try {
    plant = await retrievePlant(id);
    species = await retrieveSpecies(plant.plantId);
  } catch (e) {
    handleError(e);
    throw e;
  }
  return {
    ...species,
    ...plant,
  };
};

const fetchAndSavePlantSpecies = async (plantId) => {
  let plant;
  try {
    const result = await firebase
      .firestore()
      .collection('plants')
      .doc(plantId)
      .get();
    plant = result.data();
    return storeSpecies(plantId, plant);
  } catch (e) {
    throw e;
  }
};

export const storeUserPlant = async (dbId, plant) => {
  let result;
  try {
    result = await storePlant(dbId, { ...plant, id: dbId });
  } catch (e) {
    handleError(e);
  }
  return fetchAndSavePlantSpecies(plant.plantId, result);
};

export const downloadPlant = (userId, plantOverview) => {
  const db = firebase.firestore();
  if (!userId) throw new Error('Missing User Id');
  const now = Date.now();
  const plant = {
    plantId: plantOverview.id,
    name: plantOverview.name,
    thumbnail: plantOverview.thumbnail,
    plantedTimestamp: now,
    nickname: '',
    notificationsEnabled: false,
    lastWatered: now,
  };
  return db.collection('users').doc(userId).collection('my_plants').add(plant)
    .then(docRef => docRef.id)
    .then(docId => storeUserPlant(docId, plant))
    .catch(err => handleError(err));
};
