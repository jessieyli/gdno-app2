import { AsyncStorage } from 'react-native';
import handleError from './handleError';

export const keyTypes = {
  plants: 'PLANTS',
  settings: 'SETTINGS',
};

export const setValue = async (key, value) => {
  let val = value;
  if (!key) throw new Error('No key defined');
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  try {
    await AsyncStorage.setItem(`@GDNO_${key}`, val);
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const getValue = async (key) => {
  let value;
  try {
    value = await AsyncStorage.getItem(`@GDNO_${key}`);
  } catch (e) {
    handleError(e);
    throw e;
  }
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const setMultipleValues = async keypairs => AsyncStorage.multiSet(keypairs);

export const getMultipleValues = async (keys) => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    handleError(e);
    throw e;
  }

  return values;
};

export const removeKeys = async (keys) => {
  const gdnoKeys = keys.map(k => `@GDNO_${k}`);
  AsyncStorage.multiRemove(gdnoKeys);
};

export const getAllKeysOfType = async (type) => {
  const pattern = /(@GDNO)(_.*?_)/;
  let filter = () => false;
  if (type === keyTypes.settings) {
    filter = key => key.indexOf('@GDNO_S_') >= 0;
  } else if (type === keyTypes.plants) {
    filter = key => !key.match(pattern);
  }
  let keyList;
  let results;
  try {
    keyList = await AsyncStorage.getAllKeys();
    results = await getMultipleValues(keyList.filter(filter));
  } catch (e) {
    handleError(e);
    throw e;
  }

  if (results === null) {
    return [];
  }
  return results;
};

export const clearKeys = async () => {
  let keys;
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    handleError(e);
  }
  AsyncStorage.multiRemove(keys, (e) => {
    if (e) handleError(e);
  });
};
