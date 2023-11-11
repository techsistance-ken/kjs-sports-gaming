<script>
	import { StructuredList, StructuredListHead, StructuredListRow, StructuredListCell, Button } from "carbon-components-svelte";
  import { Timestamp } from "firebase/firestore";
	import { has } from "ramda";
    /**
	 * @type {any}
	 */
     export let matches;

</script>

<!-- <div>
    {JSON.stringify(matches)}
</div> -->
<StructuredList>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>Time</StructuredListCell>
        <StructuredListCell head>Result</StructuredListCell>
        {#if has("oName")(matches[0])} 
        <StructuredListCell head>Opponent</StructuredListCell>
        {/if}
        <StructuredListCell head>Score</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    {#each matches as game, i}
    <StructuredListRow>
      <StructuredListCell>{new Date(game.timestamp*1000).toLocaleDateString()}<br>{new Date(game.timestamp*1000).toLocaleTimeString()}</StructuredListCell>
      <StructuredListCell noWrap>{game.resultDesc}</StructuredListCell>
        {#if has("oName")(game)}
      <StructuredListCell>
          {game.oName} {game.oRecord ? `(${game.oRecord})` : ""}
      </StructuredListCell>
        {/if}
      <StructuredListCell>{game.goals} - {game.ogoals}</StructuredListCell>
    </StructuredListRow>
    {/each} 
  </StructuredList>