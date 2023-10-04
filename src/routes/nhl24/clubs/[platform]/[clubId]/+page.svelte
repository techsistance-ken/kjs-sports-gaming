<script>
    import {
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
  } from "carbon-components-svelte"; 

    /** @type {import('./$types').PageData} */
    export let data;
</script>
  
  <h2>Stats for {data.clubStats.name} in Division {data.clubStats.div}</h2>
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
    <StructuredListCell>{game.oName}</StructuredListCell>
    <StructuredListCell>{game.goals} - {game.ogoals}</StructuredListCell>
  </StructuredListRow>
  {/each} 
</StructuredList>
  
  