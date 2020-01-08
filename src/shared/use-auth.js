/* from https://usehooks.com/ */
import React, {
  useState, useEffect, useContext, createContext
} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './secrets';
import { setValue } from './data/localStorage';

firebase.initializeApp(firebaseConfig);

const authContext = createContext();

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [features, setFeatures] = useState([]);

  const storeZipcode = (zipcode) => {
    setValue('S_zipcode', zipcode);
  };

  const fetchAndSaveUserFeatures = async (userId) => {
    const result = await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get();
    const settings = result.data();
    if (settings.features !== undefined) {
      setFeatures(settings.features);
    }
    if (settings.zipcode !== undefined) {
      storeZipcode(settings.zipcode);
    }
  };

  const signin = (email, password) => firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      setUser(response.user);
      return response.user;
    })
    .then((u) => {
      fetchAndSaveUserFeatures(u.uid);
      return u;
    });

  const signup = (email, password) => firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      setUser(response.user);
      return response.user;
    });

  const signout = () => firebase
    .auth()
    .signOut()
    .then(() => {
      setUser(false);
    });

  const sendPasswordResetEmail = email => firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => true);

  const confirmPasswordReset = (code, password) => firebase
    .auth()
    .confirmPasswordReset(code, password)
    .then(() => true);

  const hasFeature = name => features.indexOf(name) >= 0;

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        fetchAndSaveUserFeatures(u.uid);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    features,
    hasFeature,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
