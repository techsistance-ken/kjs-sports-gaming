<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();


    export let competitionData;


    let pickedTeam = "";
    let spread=0;
    let odds=-110;
    let description = "";

    const anyChange = () => {
    description = `${pickedTeam} ML vs ${competitionData.homeTeam == pickedTeam ? competitionData.awayTeam : competitionData.homeTeam}`
    dispatch('anyUpdate',{
      description,
      "subject": pickedTeam,
      "vsSubject": competitionData.homeTeam == pickedTeam ? competitionData.awayTeam : competitionData.homeTeam,
      "threshold": 0.5,
      odds
    })
  }
</script>

<div class="form-group">
    <label class="form-label" for="team">Team</label>
    <select id="team" class="form-input" bind:value={pickedTeam} on:change={anyChange} >
        <option value="">--Please choose an option--</option>
            <option>{competitionData.homeTeam}</option>
            <option>{competitionData.awayTeam}</option>
    </select>    
    
    <label class="form-label" for="odds">Odds</label>
    <input id="odds" class="form-input" type="number" bind:value={odds}  on:change={anyChange}/>

    <span>{description}</span>
    <!-- <label class="form-label" for="gameDate">Game Date</label>
    <input id=gameDate class="form-input" type="date" bind:value={data.gameDate}/> -->
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