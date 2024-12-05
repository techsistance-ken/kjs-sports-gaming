// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { 
  Timestamp,
  getCountFromServer,
  doc, query, getDoc, getDocs, getFirestore, collection, orderBy, startAfter, limit, addDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmL4TwBvOKAWoIIie70J6Bv-zAXLkOv78",
  authDomain: "kjs-sports-gaming.firebaseapp.com",
  projectId: "kjs-sports-gaming",
  storageBucket: "kjs-sports-gaming.appspot.com",
  messagingSenderId: "1032970451056",
  appId: "1:1032970451056:web:7d7b533fc336a1c7cc5cb5",
  measurementId: "G-4PFX09MKBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = agetAnalytics(app);
const auth = getAuth(app);
let db = getFirestore(app);

// Function to fetch all wagers
export const fetchWagers = async () => {
  let wagersRef = collection(db, 'users/kjdadada/wagertracker/1/wager');
  
  // Fetch all wagers data (no pagination)
  const wagersQuery = query(wagersRef);
  const querySnapshot = await getDocs(wagersQuery);
  const wagers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch the total count of wagers (optional, for statistics or display)
  const countQuery = query(wagersRef);
  const countSnapshot = await getCountFromServer(countQuery);
  const totalWagers = countSnapshot.data().count;

  return { wagers, totalWagers };
};

export {
    auth,
    doc,
    Timestamp,
    getDoc,
    getDocs,
    collection,
    query,
    getCountFromServer,
    db
}
