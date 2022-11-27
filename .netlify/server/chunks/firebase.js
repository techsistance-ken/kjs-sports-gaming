import { initializeApp } from "firebase/app";
import "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBmL4TwBvOKAWoIIie70J6Bv-zAXLkOv78",
  authDomain: "kjs-sports-gaming.firebaseapp.com",
  projectId: "kjs-sports-gaming",
  storageBucket: "kjs-sports-gaming.appspot.com",
  messagingSenderId: "1032970451056",
  appId: "1:1032970451056:web:7d7b533fc336a1c7cc5cb5",
  measurementId: "G-4PFX09MKBN"
};
const app = initializeApp(firebaseConfig);
getAuth(app);
let db = getFirestore(app);
export {
  db as d
};
