/* eslint-disable */
// import firebase from 'firebase'
// const firebase = require('./database');
const firebase = require('../../../node_modules/firebase/firebase')

const config = {
  apiKey: "AIzaSyBazTQ7cZwAQfSomDAnLKdOSgtGvD5ZAPk",
  authDomain: "safaris-10946.firebaseapp.com",
  databaseURL: "https://safaris-10946.firebaseio.com",
  projectId: "safaris-10946",
  storageBucket: "safaris-10946.appspot.com",
  messagingSenderId: "524202249302",
};

export default {
  db: () => {
    firebase.initializeApp(config);
    return firebase.database();
  },

  /** GET All */
  fetchAll: (db, ref) => new Promise((resolve) => {
    db.ref(`/${ref}`)
      .once('value', v => resolve(v.val()));
  }),

  fetchUpdates: (db) => new Promise((resolve) => {
    let that = this
    db.ref('new')
      .on("child_added", v => {
        resolve(v.key)
      });
  }),

  /** GET One */
  fetchOne: (db, ref, key) => new Promise((resolve) => {
    db.ref(`/${ref}/${key}`)
      .once('value')
      .then(v => resolve(v.val()));
  }),

  /** POST One */
  addOne: (db, ref, key, contactData) => new Promise((resolve) => {
    resolve(db.ref(`/${ref}`).child(key).set(contactData));
  }),

  /** DELETE One */
  removeOne: (db, ref, key) => new Promise((resolve) => {
    resolve(db.ref(`/${ref}`).child(key).remove());
  }),
}
;
