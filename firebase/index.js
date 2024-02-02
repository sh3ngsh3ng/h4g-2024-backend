/*
  firebase/index.js
*/
// import admin from 'firebase-admin'
// const { initializeApp } = require('firebase-admin/app');
const admin = require("firebase-admin")
import { serviceAccount } from "./credential";

export const adminApp = admin.initializeApp({
  credentials: admin.credential.cert(serviceAccount),
  projectId: "volunteerwave-auth"
});


// module.exports = firebase;