<script>
    import { onMount } from 'svelte';
	import AutoComplete from './AutoComplete.svelte';
	import Dropdown from './Dropdown.svelte';
	// import NflInput from './NFLInput.svelte';

    // Bet types and their corresponding forms
    const betTypes = [
        "Spread",
        "Moneyline",
        "Over Under",
        "Game Prop",
        "Game Special",
        "Player Prop",
        "Player Special",
    ];

    let selectedBetType = betTypes[0]; // Default selection

    let sports = [
        "FOOTBALL",
        "BASEBALL",
        "BASKETBALL",
        "HOCKEY",
        "SOCCER"
    ]

    let leagues = {
        "FOOTBALL": [
            "NFL",
            "NCAAF"
        ]
    }
    let selectedSport = "FOOTBALL"
    function handleSelect(event) {
    // alert(`You selected: ${event.detail.value}`);
  }

  function handleAdd(event) {
    // alert(`You added: ${event.detail.item}`);
  }
</script>

<style>
    .form-section {
        margin-top: 16px;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
    }
</style>
<div>
    <label for="sport">Sport: </label>
    <Dropdown items={sports}   on:add={handleAdd} 
      bind:selectedValue={selectedSport} on:select={handleSelect} />
    <p>Selected fruit: {selectedSport}</p>
</div>
<div>
    <label for="betType">Select Bet Type:</label>
    <select id="betType" bind:value={selectedBetType}>
        {#each betTypes as type}
            <option value={type}>{type}</option>
        {/each}
    </select>

    <!-- Dynamic Form Section -->
    <div class="form-section">
        {#if selectedBetType === "Spread"}
            <label for="spreadValue">Spread Value:</label>
            <input id="spreadValue" type="number" placeholder="Enter spread value" />
        {:else if selectedBetType === "Moneyline"}
            <label for="moneylineOdds">Odds:</label>
            <input id="moneylineOdds" type="number" placeholder="Enter moneyline odds" />
        {:else if selectedBetType === "Over Under"}
            <label for="total">Total:</label>
            <input id="total" type="number" placeholder="Enter total points" />
            <label>
                <input type="radio" name="overUnder" value="Over" /> Over
            </label>
            <label>
                <input type="radio" name="overUnder" value="Under" /> Under
            </label>
        {:else if selectedBetType === "Game Prop"}
            <label for="gameProp">Game Prop Details:</label>
            <textarea id="gameProp" placeholder="Describe the game prop"></textarea>
        {:else if selectedBetType === "Game Special"}
            <label for="gameSpecial">Game Special Description:</label>
            <textarea id="gameSpecial" placeholder="Describe the game special"></textarea>
        {:else if selectedBetType === "Player Prop"}
            <label for="playerName">Player Name:</label>
            <input id="playerName" type="text" placeholder="Enter player's name" />
            <label for="playerProp">Prop Details:</label>
            <textarea id="playerProp" placeholder="Describe the player prop"></textarea>
        {:else if selectedBetType === "Player Special"}
            <label for="playerSpecialName">Player Name:</label>
            <input id="playerSpecialName" type="text" placeholder="Enter player's name" />
            <label for="playerSpecial">Special Details:</label>
            <textarea id="playerSpecial" placeholder="Describe the player special"></textarea>
        {/if}
    </div>
</div>