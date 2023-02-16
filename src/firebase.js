import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDrigVJRa8NDGI57TmhMaAk_jzPhGrnPEE",
  authDomain: "topcoder-easy-task.firebaseapp.com",
  projectId: "topcoder-easy-task",
  storageBucket: "topcoder-easy-task.appspot.com",
  messagingSenderId: "224809283269",
  appId: "1:224809283269:web:c61ed51c2e08d2967c8aac",
  measurementId: "G-7MV3B6FJKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);