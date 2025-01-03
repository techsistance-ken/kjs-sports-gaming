<script>
	export let competitionData;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();


	let overunder = '';
	let points = 55;
	let odds = -110;

	let description = "";
  
  const anyChange = () => {
    description = `${competitionData.homeTeam} ${competitionData.awayTeam} ${overunder} ${points}`
    dispatch('anyUpdate',{
      description,
      "subject": `${competitionData.homeTeam}, ${competitionData.awayTeam}`,
      "threshold": points,
	  "overUnder": overunder,
      odds
    })
  }
</script>

<div class="form-group">
	<label class="form-label" for="overunder">Over/Under</label>
	<select id="overunder" class="form-input" bind:value={overunder} on:change={anyChange}>
		<option value="">--Please choose an option--</option>
		<option>Over</option>
		<option>Under</option>
	</select>

	<label class="form-label" for="points">Points</label>
	<input id="points" class="form-input" type="number" bind:value={points} on:change={anyChange} />

	<label class="form-label" for="odds">Odds</label>
	<input id="odds" class="form-input" type="number" bind:value={odds} on:change={anyChange} />
	<!-- <label class="form-label" for="gameDate">Game Date</label>
    <input id=gameDate class="form-input" type="date" bind:value={data.gameDate}/> -->

	<span>{description}</span>
</div>

<style>
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.form-label {
		font-size: 0.875rem;
		font-weight: bold;
		color: #333;
	}

	.form-input {
		padding: 0.75rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		outline: none;
		transition: border-color 0.2s ease-in-out;
	}
</style>
