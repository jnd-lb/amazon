// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAWhMxtUx3fzcPMdTyTSsF_PdL8ZSjUEV0",
    authDomain: "whatsapp-c4b1f.firebaseapp.com",
    projectId: "whatsapp-c4b1f",
    storageBucket: "whatsapp-c4b1f.appspot.com",
    messagingSenderId: "1031185482934",
    appId: "1:1031185482934:web:b12215c68ed8070e5dd217",
    measurementId: "G-7CS39HYVTM"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;