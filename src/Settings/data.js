import * as firebase from 'firebase';
import 'firebase/firestore';

export const defaultSettings = {
  firstName: '',
  lastName: '',
  email: '',
  zipcode: '',
};

export const getSettings = async authUser => firebase.firestore().collection('users').doc(authUser.uid).get();
