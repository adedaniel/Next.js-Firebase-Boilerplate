import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDy6ZSzPQCVBrozvMz_hCF60-GswvBcB5U",
  authDomain: "react-fire-b1ee2.firebaseapp.com",
  databaseURL: "https://react-fire-b1ee2.firebaseio.com",
  projectId: "react-fire-b1ee2",
  storageBucket: "react-fire-b1ee2.appspot.com",
  messagingSenderId: "437986309613",
  appId: "1:437986309613:web:e5bf6179b9d6cb8cfc23e4",
};
// Initialize Firebase
let fireDb = firebase;
try {
  fireDb = firebase.initializeApp(firebaseConfig);
} catch (error) {
  // we skip the “already exists” message which is
  // not an actual error when we’re hot-reloading
  if (!/already exists/.test(error.message)) {
    console.error("Firebase initialization error raised", error.stack);
  }
}

export default fireDb.database().ref();
export const fireAuth = fireDb.auth();
export const fireStore = fireDb.firestore();
