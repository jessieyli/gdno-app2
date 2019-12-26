import * as firebase from 'firebase';
import 'firebase/firestore';

import handleError from '../shared/data/handleError';
import { performGet } from '../shared/data/rest';
import {
  getValue, keyTypes, getStoredDataOfType
} from '../shared/data/localStorage';
import { DARKSKY_KEY } from '../shared/secrets';

export { default as getCoordsForZip } from './travisZipcodes';

export const loadStoredPlants = async () => {
  try {
    const plants = await getStoredDataOfType(keyTypes.plants);
    return plants.map(v => JSON.parse(v[1]));
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const loadWeatherDataFromCoords = async (lat, lng) => {
  let weatherData;
  // TODO: replace URL with function url
  const url = `https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`;
  try {
    const apiResponse = await performGet(url);
    weatherData = apiResponse.data;
  } catch (err) {
    throw err;
  }
  return weatherData;
};

export const getZipcodeForUserId = userId => firebase.firestore().collection('users').doc(`${userId}`).get();

export default {
  loadStoredPlants,
  getZipcodeForUserId,
};
