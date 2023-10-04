import { error } from '@sveltejs/kit';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { descend, length, map, prop, reverse, sort } from 'ramda';
import { db, doc, getDoc, collection } from '../../../../../firebase';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  const q = await getDoc(doc(collection(db,`/nhl24/${params.platform}/players`),params.playerId))

  const gameHistorySnapshot = await getDocs(collection(db,`/nhl24/${params.platform}/players/${params.playerId}/gameHistory`))
  const gameHistoryUnsorted =  gameHistorySnapshot.docs.map(doc => doc.data());
  const gameHistory= sort(descend(prop("timestamp")),gameHistoryUnsorted)


  const playerStats = {
    gameHistory,
    name: q.get("name"),
    goals: q.get("goals"),
    assists: q.get("assists"),
    points: q.get("points"),
    gamesPlayed: q.get("gp"),
    wins: q.get("wins"),
    losses: q.get("losses"),
    otl: q.get("otl"),
    hatTricks: q.get("hattricks"),
    plusMinus: q.get("plusmin"),
    pointsPerGame: q.get("pointspg"),
    breakaways: q.get("breakaways"),
    breakawayPct: q.get("breakawaypct"),
    breakawayGoals: q.get("brkgoals"),
    dekesAttempted: q.get("dekes"),
    dekesMade: q.get("dekesmade"),
    penaltiesDrawn: q.get("penaltiesdrawn"),
    penaltyAttempts: q.get("penaltyattempts"),
    penaltyGoals: q.get("penaltyshotgoals"),
    peanltyPct: q.get("penaltyshotpct"),
    gameWinners: q.get("gwg"),
    faceoffsWon: q.get("fow"),
    faceoffsLost: q.get("fol"),
    faceoffs: q.get("fo"),
    faceoffPct: q.get("fop"),
    shotAttempts: q.get("shotattempts"),
    shotsOnNetPct: q.get("shotonnetpct"),
    shotPct: q.get("shotpct"),
    shots: q.get("shots"),
    shotsPerGame: q.get("shotspg"),
    passes: q.get("passes"),
    passAttempts: q.get("passattempts"),
    passPct: q.get("passpct"),
    saucers: q.get("saucerpasses"),
  }

  return {
    playerStats:  playerStats
  };
}