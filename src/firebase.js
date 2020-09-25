import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcjQZCdsuQzcdA9Zk1-xvJ43qLM3Nl4ho",
    authDomain: "fresh-vibes.firebaseapp.com",
    databaseURL: "https://fresh-vibes.firebaseio.com",
    projectId: "fresh-vibes",
    storageBucket: "fresh-vibes.appspot.com",
    messagingSenderId: "772541813549",
    appId: "1:772541813549:web:ae9aa0c6ce4b542ffd39a4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;