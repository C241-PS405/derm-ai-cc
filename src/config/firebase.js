require("dotenv").config();
const firebase = require("firebase/app");

const admin = require("firebase-admin");
const serviceAccount = require("./firebaseService.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: "AIzaSyBXbITRfnH5oZNJk-7ZQjWcwbL37qHFqBI",
  authDomain: "capstoneprojectdermai.firebaseapp.com",
  projectId: "capstoneprojectdermai",
  storageBucket: "capstoneprojectdermai.appspot.com",
  messagingSenderId: "858497484323",
  appId: "1:858497484323:web:d4ce374e16d31dca08d396",
};

firebase.initializeApp(firebaseConfig);

const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("firebase/auth");

module.exports = {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  admin,
};
