// @ts-nocheck
import { writable } from 'svelte/store';
import { db, doc, getDocs, collection, updateDoc, deleteDoc, addDoc } from "../firebase.js"



// Svelte writable store
const wagersStore = writable([]);
const errorStore = writable(null); // Store for error messages

let isLoaded = false;

// Helper to get a user's wagers collection
function getUserWagersCollection(userID) {
  return collection(db, `users/${userID}/wagertracker/1/wager`);
}

// Load wagers for a specific user
async function loadWagers(userID) {
  if (isLoaded) return;

  try {
    const snapshot = await getDocs(getUserWagersCollection(userID));
    const wagers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    wagersStore.set(wagers);
    isLoaded = true;
    errorStore.set(null); // Clear any existing errors
  } catch (error) {
    errorStore.set('Error loading wagers: ' + error.message);
    console.error('Error loading wagers:', error);
  }
}

// Add a new wager for a specific user
async function addWager(userID, newWager) {
  try {
    console.log("b")
    const docRef = await addDoc(getUserWagersCollection(userID), newWager);
    console.log("c")
    const addedWager = { id: docRef.id, ...newWager };
    console.log(`d: ${docRef.id}`)
    console.log(`d: ${docRef.path}`)

    wagersStore.update(wagers => [...wagers, addedWager]);
    errorStore.set(null); // Clear any existing errors
  } catch (error) {
    errorStore.set('Error adding wager: ' + error.message);
    console.error('Error adding wager:', error);
  }
}

// Delete a wager for a specific user
async function deleteWager(userID, wagerId) {
  try {
    await deleteDoc(doc(db, `users/${userID}/wagers/${wagerId}`));

    wagersStore.update(wagers => wagers.filter(wager => wager.id !== wagerId));
    errorStore.set(null); // Clear any existing errors
  } catch (error) {
    errorStore.set('Error deleting wager: ' + error.message);
    console.error('Error deleting wager:', error);
  }
}

// Update a wager for a specific user
async function updateWager(userID, wagerId, updatedData) {
  try {
    const wagerDoc = doc(db, `users/${userID}/wagers/${wagerId}`);
    await updateDoc(wagerDoc, updatedData);

    wagersStore.update(wagers =>
      wagers.map(wager => (wager.id === wagerId ? { ...wager, ...updatedData } : wager))
    );
    errorStore.set(null); // Clear any existing errors
  } catch (error) {
    errorStore.set('Error updating wager: ' + error.message);
    console.error('Error updating wager:', error);
  }
}

// Export the store and functions
export { wagersStore, errorStore, loadWagers, addWager, deleteWager, updateWager };
