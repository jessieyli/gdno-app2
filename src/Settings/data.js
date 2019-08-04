import { fromPairs } from 'lodash';
import { setMultipleValues, getAllKeysOfType, keyTypes } from '../shared/data/localStorage';
import handleError from '../shared/data/handleError';

const prefix = '@GDNO_S_';

const parseResults = (arrayResult) => {
  const simplifiedKeys = arrayResult.map(
    array => [array[0].replace(prefix, ''), array[1]]
  );
  return fromPairs(simplifiedKeys);
};

export const defaultSettings = {
  firstName: '',
  lastName: '',
  email: '',
  zipcode: '',
};

export const getSettings = async () => {
  try {
    const result = await getAllKeysOfType(keyTypes.settings);
    return parseResults(result);
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const saveSettings = async ({
  email,
  firstName,
  lastName,
  zipcode,
}) => {
  const keypairs = [];
  if (email) keypairs.push([`${prefix}email`, email]);
  if (firstName) keypairs.push([`${prefix}firstName`, firstName]);
  if (lastName) keypairs.push([`${prefix}lastName`, lastName]);
  if (zipcode) keypairs.push([`${prefix}zipcode`, zipcode]);
  console.log(keypairs);
  setMultipleValues(keypairs);
};
