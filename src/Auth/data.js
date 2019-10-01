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

export const getSettings = async authUser => firebase
  .firestore()
  .collection('users')
  .doc(authUser.uid)
  .get();

export const addUserSettings = async (uid, settings) => {
  const userSettings = getValidKeypairs(settings, settingsKeys);
  return firebase.firestore().collection('users').doc(uid).set(userSettings, { merge: true });
};

export const storeUser = user => setValue('S_uid', user.uid);
