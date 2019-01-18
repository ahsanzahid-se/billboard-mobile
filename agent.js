import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
let API_KEY = 'AIzaSyB_uITgqwoMnmmzZd6PtOxCv4Oni5Qupas';
let APP_UID = 'ollie-369';

var config = {
    apiKey: `${API_KEY}`,
    authDomain: `${APP_UID}.firebaseapp.com`,
    databaseURL: `https://${APP_UID}.firebaseio.com`,
    projectId: `${APP_UID}`,
    storageBucket: `${APP_UID}.appspot.com`
};

firebase.initializeApp(config);

let auth = firebase.auth();
let db = firebase.database();
let storage = firebase.storage();

const credential = firebase.auth.EmailAuthProvider.credential;
let TIMESTAMP = firebase.database.ServerValue.TIMESTAMP;

export {
    auth,
    db,
    storage,
    credential,
    TIMESTAMP
};