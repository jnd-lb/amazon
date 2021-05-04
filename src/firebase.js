// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA_ip9sj9lG3ahpAaT79voHOYBm0YU5XW0",
  authDomain: "app-b56f6.firebaseapp.com",
  projectId: "app-b56f6",
  storageBucket: "app-b56f6.appspot.com",
  messagingSenderId: "987686443911",
  appId: "1:987686443911:web:e82d3b8cdc191012805122"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  //const provider = new firebase.auth.GoogleAuthProvider();

  export {auth/* ,provider */};
  export default db;