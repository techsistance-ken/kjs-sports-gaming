import { writable } from "svelte/store";
import { db, getDocs, collection, updateDoc, doc, query, orderBy } from "../firebase.js";


// Svelte writable store
const createScheduleStore = () => {
    const { subscribe, set, update } = writable({
        schedule: [],
        wins: 0,
        losses: 0,
      });  
      
 // Calculate wins, losses, and player-specific stats
 const calculateStats = (schedule) => {
    let wins = 0;
    let losses = 0;
    const playerStats = {};

    schedule.forEach((game) => {
      const ourscore = game.ourscore ?? 0;
      const oppscore = game.oppscore ?? 0;

      // Determine game outcome
      if (ourscore > oppscore) {
        wins++;
        if (game.player) {
          playerStats[game.player] = playerStats[game.player] || { wins: 0, losses: 0 };
          playerStats[game.player].wins++;
        }
      } else if (ourscore < oppscore) {
        losses++;
        if (game.player) {
          playerStats[game.player] = playerStats[game.player] || { wins: 0, losses: 0 };
          playerStats[game.player].losses++;
        }
      }
    });

    return { wins, losses, playerStats };
  };
  // Update a specific document by ID
  const updateDocument = async (id, data) => {
    try {
      const docRef = doc(db, "phillies", id);
      await updateDoc(docRef, data);

      update((state) => {
        const updatedSchedule = state.schedule.map((game) =>
          game.id === id ? { ...game, ...data } : game
        );

        const { wins, losses, playerStats } = calculateStats(updatedSchedule);
        return { schedule: updatedSchedule, wins, losses, playerStats };
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Fetch all documents from Firestore, ordered by gameDate
  const fetchAll = async () => {
    try {
      const q = query(collection(db, "phillies"), orderBy("gameDate"));
      const querySnapshot = await getDocs(q);
      const schedule = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const { wins, losses, playerStats } = calculateStats(schedule);
      set({ schedule, wins, losses, playerStats });
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };


  // Initial fetch of data
  fetchAll();

  return {
    subscribe,
    fetchAll, // Method to refresh the data
    updateDocument // Method to update a document
  };
};

export const scheduleStore = createScheduleStore();
