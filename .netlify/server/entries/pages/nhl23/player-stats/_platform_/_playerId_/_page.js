import { getDoc, doc, collection } from "firebase/firestore";
import { d as db } from "../../../../../../chunks/firebase.js";
async function load({ params }) {
  const querySnapshot = await getDoc(doc(collection(db, "/nhl23/player-stats/by-id"), `${params.playerId}-${params.platform}`));
  let myDocs = "";
  myDocs = await querySnapshot.get("path");
  const q = await getDoc(doc(db, "/nhl23/player-stats/" + myDocs));
  q.get("gamesplayed");
  const playerStats = {
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
    saucers: q.get("saucerpasses")
  };
  return {
    playerStats
  };
}
export {
  load
};
