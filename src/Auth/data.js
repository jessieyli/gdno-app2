import * as firebase from 'firebase';
import 'firebase/firestore';

import { setValue, getValue } from '../shared/data/localStorage';
import handleError from '../shared/data/handleError';

const settingsKeys = [
  'firstName',
  'lastName',
  'growerType',
  'zipcode',
  'reminderTime',
];
export const defaultSettings = {
  firstName: '',
  lastName: '',
  email: '',
  zipcode: '',
  reminderTime: '',
};

function getValidKeypairs(object, keyList) {
  const returnObj = {};
  keyList.forEach((key) => {
    if (typeof object[key] !== 'undefined') {
      returnObj[key] = object[key];
    }
  });
  return returnObj;
}

export const getStoredUser = async () => {
  let result;
  try {
    result = await getValue('S_uid');
  } catch (e) {
    handleError(e);
    throw e;
  }
  return result;
};

export const getStoredInfo = async () => {
  let uid;
  let zipcode;
  try {
    uid = await getValue('S_uid');
    zipcode = await getValue('S_zipcode');
  } catch (e) {
    handleError(e);
    throw new Error('There was a problem fetching stored data');
  }
  return {
    uid,
    zipcode,
  };
};

export const getSettings = async authUser => firebase
  .firestore()
  .collection('users')
  .doc(authUser.uid)
  .get();

const storeZipcode = (zipcode) => {
  setValue('S_zipcode', zipcode);
};

export const addUserSettings = async (uid, settings) => {
  const userSettings = getValidKeypairs(settings, settingsKeys);
  if (settings.zipcode) {
    storeZipcode(settings.zipcode);
  }
  return firebase.firestore().collection('users').doc(uid).set(userSettings, { merge: true });
};

export const storeUser = user => setValue('S_uid', user.uid);
