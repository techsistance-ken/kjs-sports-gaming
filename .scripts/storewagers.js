import { initializeApp, cert} from 'firebase-admin/app';
import { getFirestore, Timestamp } from "firebase-admin/firestore";

import * as R from 'ramda';
import betTrackerData from './wager.json' assert { type: 'json' };

const jsonFileEncoded = process.env.FIREBASE_ENC;
let bufferObj = Buffer.from(jsonFileEncoded, "base64");
// Encode the Buffer as a base64 string 
let jsonFileDecoded = JSON.parse(bufferObj.toString("utf8"));

const app = initializeApp(
  {
    projectId: R.prop("project_id")(jsonFileDecoded),
    credential: cert(jsonFileDecoded)
    // databaseURL: "https://kjs-sports-gaming.firebaseio.com"
  }
);

const db = getFirestore();

// Function to save data to Firestore
const saveBetAndWager = async (betTrackerData) => {
    for (const betData of betTrackerData) {
      try {
        // Extract the contest details for the bet document
        const contest = betData.contest || {};
        const betDocument = {
          ...betData.bet, // Include all bet fields
        };
  
        // Save the bet object to the "bet" collection under the document "/users/kjdadada/wagertracker/1"
        const betRef = await db.collection('users')
          .doc('kjdadada')
          .collection('wagertracker')
          .doc('1')
          .collection('bet')
          .add(betDocument);
  
        console.log(`Bet saved with ID: ${betRef.id}`);
  
        // Save the wager object to the "wager" collection under the same path
        const wagerData = {
          ...betData.wager,  // Include all wager data
          bet: { id: betRef.id, description: betData.bet.description,result: betData.bet.result }   // Add betId field to link to the bet document
        };
  
        const wagerRef = await db.collection('users')
          .doc('kjdadada')
          .collection('wagertracker')
          .doc('1')
          .collection('wager')
          .add(wagerData);
  
        console.log(`Wager saved with ID: ${wagerRef.id}`);
  
      } catch (error) {
        console.error('Error saving bet and wager:', error);
      }
    }
  };
  
  // Run the function with your betTracker data
  saveBetAndWager(betTrackerData);