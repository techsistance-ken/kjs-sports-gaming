import { error } from '@sveltejs/kit';
import { collectionGroup } from 'firebase/firestore';
import { db, doc, getDoc, getDocs, collection } from '../../../../../firebase';
import { descend, prop, sort } from "ramda"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  const q = await getDoc(doc(collection(db,`/nhl23/${params.platform}/clubs`),params.clubId));
  const seasonGamesSnapshot = await getDocs(collection(db,`/nhl23/${params.platform}/clubs/${params.clubId}/seasons`));
  const seasonGamesUnsorted = seasonGamesSnapshot.docs.map(doc => doc.data());
  const seasonGames = sort(descend(prop("timestamp")),seasonGamesUnsorted)




  const clubStats = {
    name: q.get("name"),
    div: q.get("currentDivision"),
    record: q.get("record"),
  }


  return {
    clubStats: clubStats,
    seasonGames
  };
}