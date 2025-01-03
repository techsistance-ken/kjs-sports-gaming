<script>
    import { createEventDispatcher } from 'svelte';
    import {keys, length, path} from "ramda"
    // export let formData;


    export let teamsList;
    export let data;

    // let homeTeam = "";
    // let awayTeam = "";
    // let gameDate = "";
    // let betType = "";

    export let betTypes;
    
    const dispatch = createEventDispatcher();

    function changeBetType(e) {
        dispatch('betTypeChange');
    }

</script>
<div class="form-group">
    <label class="form-label" for="home">Home Team</label>
        {#if length(teamsList)}
        <select id="home" class="form-input" bind:value={data.homeTeam} >
            <option value="">--Please choose an option--</option>
            {#each teamsList as opt}
                <option value={opt}>{opt}</option>
            {/each}
        </select>    
        {:else}
        <input id="home" class="form-input" type="text" bind:value={data.homeTeam}/>
        {/if}
    <label class="form-label" for="away">Away Team</label>
    {#if length(teamsList)}
    <select id="away" class="form-input" bind:value={data.awayTeam} >
        <option value="">--Please choose an option--</option>
        {#each teamsList as opt}
            <option value={opt}>{opt}</option>
        {/each}
    </select>        
    {:else}
        <input id="away" class="form-input" type="text" bind:value={data.awayTeam}/>
    {/if}
    <label class="form-label" for="gameDate">Game Date</label>
    <input id=gameDate class="form-input" type="date" bind:value={data.gameDate}/>

    <label class="form-label" for="betType">Bet Type</label>
    <select id="betType" class="form-input" bind:value={data.betType} on:change={(e) => changeBetType(e)} disabled={(data.homeTeam == "" || data.awayTeam == "" || data.gameDate == "") || (data.homeTeam == data.awayTeam)}>
        <option value="">--Please choose an option--</option>
        {#each betTypes as opt}
            <option value={opt}>{opt}</option>
        {/each}
    </select>
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