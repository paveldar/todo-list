import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  // initialize Firebase
  initializeApp(firebaseConfig)

  // initialize Firestore
  const db = getFirestore()

export { db }

