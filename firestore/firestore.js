// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("./config");
const { getFirestore } = require("firebase/firestore");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

module.exports = {
  db: getFirestore(app)
};
