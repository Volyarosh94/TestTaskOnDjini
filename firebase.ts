import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD7MLae9Dv0vnULvw3pI3UuqgK8UK2wBiI',
  authDomain: 'kitglobal-e55b3.firebaseapp.com',
  databaseURL: 'https://kitglobal-e55b3-default-rtdb.firebaseio.com',
  projectId: 'kitglobal-e55b3',
  storageBucket: 'kitglobal-e55b3.appspot.com',
  messagingSenderId: '665630002352',
  appId: '1:665630002352:web:de9bfa4443b3ac2e30bf75',
  measurementId: 'G-HTCF5C5VQP',
};

const app = initializeApp(firebaseConfig);
export default getFirestore();
