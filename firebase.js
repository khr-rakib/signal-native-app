import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAm9rZuphfNqkCyJdXZIH9X4pSBoy3lVFw",
  authDomain: "signal-clone-c3341.firebaseapp.com",
  projectId: "signal-clone-c3341",
  storageBucket: "signal-clone-c3341.appspot.com",
  messagingSenderId: "978030035743",
  appId: "1:978030035743:web:391677a2ff87c25566e62a"
};

let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else {
  app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};