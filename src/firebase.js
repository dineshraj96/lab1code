import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyAjJ7ZVXwg0vAxCvMcbvMp-1-BLJjJgR6Y",
    authDomain: "lab1advancedreactnative.firebaseapp.com",
    databaseURL: "https://lab1advancedreactnative-default-rtdb.firebaseio.com",
    projectId: "lab1advancedreactnative",
    storageBucket: "lab1advancedreactnative.appspot.com",
    messagingSenderId: "312823471766",
    appId: "1:312823471766:web:1bb3a08992a27590822cb7"
  };

const app = initializeApp(firebaseConfig); 

export {app};
