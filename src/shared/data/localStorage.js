import AsyncStorage from '@react-native-community/async-storage';
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

export const removeMultipleValues = (
  keys,
  onError = () => {}
) => AsyncStorage.multiRemove(keys, onError);

export const setMultipleValues = keypairs => AsyncStorage.multiSet(keypairs);

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

export const removeKeys = (keys) => {
  const gdnoKeys = keys.map(k => `@GDNO_${k}`);
  return AsyncStorage.multiRemove(gdnoKeys);
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
  try {
    keyList = await AsyncStorage.getAllKeys();
  } catch (e) {
    handleError(e);
    throw e;
  }

  return keyList.filter(filter);
};

export const getStoredDataOfType = async (type) => {
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
    results = await getMultipleValues(
      keyList
        .filter(key => key.indexOf('@GDNO_') >= 0)
        .filter(filter)
    );
  } catch (e) {
    handleError(e);
    throw e;
  }

  if (results === null) {
    return [];
  }
  return results;
};

export const clearAllKeys = async () => {
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

export const clearSettings = async () => {
  // TODO: Replace with removing just UID
  let keys;
  try {
    keys = await getAllKeysOfType('SETTINGS');
  } catch (e) {
    handleError(e);
  }
  const keylist = keys.filter(
    key => key.indexOf('@GDNO_') < 0 || key.indexOf('GDNO_S_') >= 0
  );
  removeMultipleValues(keylist, (e) => {
    if (e) throw e;
  });
};
