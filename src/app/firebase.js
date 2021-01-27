import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCHzrzg84hWL80-hN3nhZym3HalXyokhLA",
  authDomain: "my-web-snapchat.firebaseapp.com",
  projectId: "my-web-snapchat",
  storageBucket: "my-web-snapchat.appspot.com",
  messagingSenderId: "792840012258",
  appId: "1:792840012258:web:c1ebe7a77de5eb54a979bb",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
