import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBmhC-xWmaQMoWo-3colJOSao5WUkAzVpU",
  authDomain: "cloudffect-auth.firebaseapp.com",
  projectId: "cloudffect-auth",
  storageBucket: "cloudffect-auth.appspot.com",
  messagingSenderId: "129879580835",
  appId: "1:129879580835:web:fb4d27cec5261383041f16",
  measurementId: "G-YHQC6XVQH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()

