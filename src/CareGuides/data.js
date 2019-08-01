import { performGet, performMultipleGet } from '../shared/data/rest';
import handleError from '../shared/data/handleError';
import {
  keyTypes, getAllKeysOfType, setValue, removeKeys, getValue
} from '../shared/data/localStorage';
import { airtableKey, airtableUrl } from '../shared/secrets';

const keyifyName = name => name.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, '');

export const getPlantData = async () => {
  let plantList;
  try {
    const result = await performGet(
      `${airtableUrl}/Plants?view=overview`,
      {},
      { Authorization: `Bearer ${airtableKey}` }
    );
    plantList = result.data.records
      .filter(p => !!p.fields && p.fields.Herb && p.fields.selling)
      .map(p => ({
        name: p.fields.Herb,
        id: p.id,
        key: keyifyName(p.fields.Herb),
        imageUrl: p.fields.images ? p.fields.images[0].thumbnails.large.url : '',
      }));
  } catch (e) {
    handleError(e);
    throw e;
  }
  return plantList;
};

export const loadStoredPlants = async () => {
  try {
    const plants = await getAllKeysOfType(keyTypes.plants);
    return plants.map(v => JSON.parse(v[1]));
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const loadStoredPlantByName = async (name) => {
  const key = keyifyName(name);
  let plantInfo;
  try {
    plantInfo = await getValue(key);
  } catch (e) {
    handleError(e);
    throw e;
  }
  return plantInfo;
};

const savePlantsToStorage = (plants) => {
  const saveItems = plants.map((plant) => {
    const key = keyifyName(plant.data.fields.Herb);
    const data = {
      ...plant.data.fields,
      id: plant.data.id,
      key,
      name: plant.data.fields.Herb,
      imageUrl: plant.data.fields.images ? plant.data.fields.images[0].thumbnails.large.url : '',
    };
    return setValue(key, data);
  });
  return Promise.all(saveItems);
};

export const getAndSavePlantsToStorage = async (plantIds) => {
  let results;
  const requests = plantIds.map(id => ({
    url: `${airtableUrl}/Plants/${id}`,
    headers: { Authorization: `Bearer ${airtableKey}` },
  }));
  try {
    results = await performMultipleGet(requests);
  } catch (e) {
    handleError(e);
    throw (e);
  }
  return savePlantsToStorage(results);
};

export const removePlantsByName = async (plantNames) => {
  const names = plantNames.map(name => keyifyName(name));
  let success;
  try {
    success = await removeKeys(names);
  } catch (e) {
    handleError(e);
    throw (e);
  }
  return success;
};
