<script>
	export let competitionData;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();


	let pickedTeam = '';
	let spread = 0;
	let odds = -110;

	let description = "";
  
  const anyChange = () => {
    description = `${pickedTeam} ${spread > 0 ? "+"+spread:spread} vs ${competitionData.homeTeam == pickedTeam ? competitionData.awayTeam : competitionData.homeTeam}`
    dispatch('anyUpdate',{
      description,
      "subject": pickedTeam,
      "vsSubject": competitionData.homeTeam == pickedTeam ? competitionData.awayTeam : competitionData.homeTeam,
      "threshold": spread,
      odds
    })
  }
</script>

<div class="form-group">
	<label class="form-label" for="team">Team</label>
	<select id="team" class="form-input" bind:value={pickedTeam} on:change={anyChange}>
		<option value="">--Please choose an option--</option>
		<option>{competitionData.homeTeam}</option>
		<option>{competitionData.awayTeam}</option>
	</select>

	<label class="form-label" for="spread">Spread</label>
	<input id="spread" class="form-input" type="number" bind:value={spread} on:change={anyChange} />

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
