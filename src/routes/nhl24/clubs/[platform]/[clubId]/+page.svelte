<script>
    import {
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
	Pagination,
  } from "carbon-components-svelte"; 
	import { descend, map, prop, sort } from "ramda";
	import { collection, doc, db, getDoc, getDocs, query } from "../../../../../firebase.js";
	import { endAt, getCountFromServer, limit, orderBy } from "firebase/firestore";

    /** @type {import('./$types').PageData} */
    export let data;
    let loading = true;
    let dbLoading = true;
    let clubInfo = null;
    let documentSnapshots = null;
    let curSeasonPage = 1;
    let curSeasonPageSize = 10;


    let seasonGames = null;
    let seasonGameCount = 0;

    const loadClubDbInfo = async () => {
      dbLoading = true;
      // console.log("abc")
      // // const q = await getDoc(doc(collection(db,`/nhl24/${data.params.platform}/clubs`),data.params.clubId));
      // const seasonGamesSnapshot = await getDocs(collection(db,`/nhl24/${data.params.platform}/clubs/${data.params.clubId}/seasons`));
      // const seasonGamesUnsorted = seasonGamesSnapshot.docs.map(doc => doc.data());
      // dbLoading = false;
      // seasonGames = sort(descend(prop("timestamp")),seasonGamesUnsorted)
      const seasonsCollection = collection(db,`/nhl24/${data.params.platform}/clubs/${data.params.clubId}/seasons`)
      const q = await query(seasonsCollection, orderBy("timestamp"), limit(5));
      documentSnapshots = await getDocs(q);
      seasonGames = [];
      documentSnapshots.forEach(x => seasonGames.push(x.data()))
      
      const totalSeasonGamesSnapshot = await getCountFromServer(seasonsCollection); 
      seasonGameCount = totalSeasonGamesSnapshot.data().count;
      console.log('count: ', totalSeasonGamesSnapshot.data().count);

      dbLoading = false;



    }

    const loadClubInfo = () => 
    fetch("https://eashl-ohxio2uirq-uc.a.run.app/club",{
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
              platform: data.params.platform,
              clubId: data.params.clubId
            })
        })
          .then(x => x.json())
          .then(x => {loading=false; clubInfo = x;})
          .catch(e => {
            console.log(`Error (${e})`);
          })


    loadClubInfo();
    loadClubDbInfo();
</script>
{#if loading}
Loading . . . 
{:else}
{clubInfo}

{/if}
<div>
  {#if dbLoading}
  Loading . . . 
  {:else}

    <!-- {documentSnapshots.docs.length} -->
    <Pagination on:update={d => console.log(d)} totalItems={seasonGameCount} pageSizes={[10, 15, 20]} />


    <!-- <div style="display: flex; flex-direction: column;">
      {#each seasonGames as game} 
        <div style="display: flex; flex-direction: row;">
          <div>{game.oName}</div>
          <div>{game.result}</div>
        </div>
      {/each}
    </div> -->

  {/if}

</div>

  <!-- <h2>Stats for {data.clubStats.name} in Division {data.clubStats.div}</h2>
 <p>{data.seasonGames.length} games stored</p> 
 <StructuredList>
  <StructuredListHead>
    <StructuredListRow head>
      <StructuredListCell head>Result</StructuredListCell>
      <StructuredListCell head>Opponent</StructuredListCell>
      <StructuredListCell head>Score</StructuredListCell>
    </StructuredListRow>
  </StructuredListHead>
  {#each data.seasonGames as game, i}
  <StructuredListRow>
    <StructuredListCell noWrap>{game.resultDesc}</StructuredListCell>
    <StructuredListCell>{game.oName} {game.oRecord ? `(${game.oRecord})` : ""}</StructuredListCell>
    <StructuredListCell>{game.goals} - {game.ogoals}</StructuredListCell>
  </StructuredListRow>
  {/each} 
</StructuredList>
  
   -->