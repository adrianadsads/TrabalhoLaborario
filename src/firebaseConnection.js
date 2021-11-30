import firebase from 'firebase/app';
import 'firebase/firestore';


let firebaseConfig = {
  apiKey: "AIzaSyC09zo1kCXV3uchUJjXaxuhXkY8pLhSf58",
  authDomain: "meupetshop-2f762.firebaseapp.com",
  projectId: "meupetshop-2f762",
  storageBucket: "meupetshop-2f762.appspot.com",
  messagingSenderId: "276482534978",
  appId: "1:276482534978:web:237e91d2c0ced32fe6c7db",
  measurementId: "G-JT9QYR470X"
  };
  // Initialize Firebase
  
  if(!firebase.apps.length){
    // abrir conexao
    firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase; 