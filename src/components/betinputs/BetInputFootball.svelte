<script>
    import {path, map, keys, propEq, prop, length} from "ramda"
    import { get } from "svelte/store";
    import { NFLTeams } from "../../store/NFLTeams";
    import { writable } from 'svelte/store';

    // Create the BetSlip store
    export const BetSlip = writable({
    bets: [], // List of bet objects
    riskAmount: 10, // Total risk amount
    overallOdds: 0 // Overall odds
    });
    
    let betSlipData;
    let riskAmount = 10;
    let wagerTotalOdds = -110;
    BetSlip.subscribe(value => {
        betSlipData = value;
    });
    // Example function to add a bet to the BetSlip
    function addBet(bet) {
        BetSlip.update(current => {
        const updatedBets = [...current.bets, bet];

        return {
            bets: updatedBets,
        };
        });

       wagerTotalOdds = calculateParlayOdds(map(prop("odds"))(betSlipData.bets))
        
    }
      // Function to delete a bet from the BetSlip
    function deleteBet(index) {
        BetSlip.update(current => {
        const updatedBets = current.bets.filter((_, i) => i !== index);

        return {
            bets: updatedBets,
        };
        });
       wagerTotalOdds = calculateParlayOdds(map(prop("odds"))(betSlipData.bets))
    }

    function calculatePayout(odds, risk) {
    let payout;
    if (odds > 0) {
      payout = (odds / 100) * risk;
    } else {
      payout = (100 / Math.abs(odds)) * risk;
    }
    return `$${(+risk + payout).toFixed(2)}`; // Format payout as currency with two decimals
  }

  function calculateParlayOdds(oddsArray) {
    let decimalOdds = 1;
    if(length(oddsArray) == 1) {
        return oddsArray[0]
    }

  // Convert each American odds to decimal odds and multiply
  for (let i = 0; i < oddsArray.length; i++) {
    let odds = oddsArray[i];
    let decimal;

    if (odds > 0) {
      // Convert positive American odds to decimal
      decimal = (odds / 100) + 1;
    } else {
      // Convert negative American odds to decimal
      decimal = (100 / Math.abs(odds)) + 1;
    }

    decimalOdds *= decimal;
  }

  // Convert the final decimal odds back to American odds
  let parlayOdds;
  if (decimalOdds > 2) {
    // Positive American odds
    parlayOdds = Math.round((decimalOdds - 1) * 100);
  } else {
    // Negative American odds
    parlayOdds = -Math.round(100 / (decimalOdds - 1));
  }

  return parlayOdds;
}

    let nflTeams = get(NFLTeams); // fetch all teams from the store
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
    let formData = {
      home: {
        value: '',
        inputType: 'select',
        options: map(prop("abbreviation"))(nflTeams) 
      }, 
      away: {
        value: '',
        inputType: 'select',
        options: map(prop("abbreviation"))(nflTeams) 
      },
      gameDate: {
        value: '',
        inputType: 'date'
      },
      bettype: {
        value: '',
        inputType: 'select',
        options: betTypes
      },
      description: {
        value: '',
        inputType: 'text',
      },
      odds: {
        value: '',
        inputType: 'text',
      },
    //   betFor: '',
    //   betAgainst: '',
    //   odds: ''
    };
  
    function saveForm() {
      console.log('Form saved:', formData);
      // Implement save logic here
      addBet({
        competitor1: formData.home.value,
        competitor2: formData.away.value,
        gameDate: formData.gameDate.value,
        description: formData.description.value,
        odds: formData.odds.value

      })
    }
  
    function cancelForm() {
      console.log('Form canceled');
      // Implement cancel logic here
    }
  </script>
  
  <style>
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
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
  
    .form-input:focus {
      border-color: #007BFF;
    }
  
    .form-actions {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
    }
  
    .button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
  
    .button-save {
      background-color: #007BFF;
      color: #fff;
    }
  
    .button-save:hover {
      background-color: #0056b3;
    }
  
    .button-cancel {
      background-color: #f8f9fa;
      color: #333;
    }
  
    .button-cancel:hover {
      background-color: #e2e6ea;
    }

    .bet-slip-container {
    margin-top: 2rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .bet-slip-header {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .bet-item {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
  }

  .bet-summary {
    margin-top: 1rem;
  }
  .delete-button {
    background-color: #dc3545;
    color: #fff;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .delete-button:hover {
    background-color: #c82333;
  }
  </style>
  
  <div class="form-container">
    {#each keys(formData) as key}
        <div class="form-group">
        <label class="form-label" for={key}>{key}</label>
        {#if path([key,"inputType"],formData) == "text"}
            <input id={key} class="form-input" type="text" bind:value={formData[key].value}/> 
        {:else if path([key,"inputType"],formData) == "date"} 
            <input id={key} class="form-input" type="date" bind:value={formData[key].value}/>

        {:else if path([key,"inputType"],formData) == "select"}
            <select id={key} class="form-input" bind:value={formData[key].value}>
                <option value="">--Please choose an option--</option>
                {#each path([key,"options"],formData) as opt}
                    <option value={opt}>{opt}</option>
                {/each}
            </select>
        {:else}
            ERROR INPUT TYPE
        {/if}
        <!-- bind:value={.value} /> -->
        </div>
    {/each}
    <div class="form-actions">
      <button class="button button-save" on:click={saveForm}>Add to Betslip</button>
      <button class="button button-cancel" on:click={cancelForm}>Clear Bet</button>
    </div>
  </div>
 
  <div class="bet-slip-container">
    <div class="bet-slip-header">Bet Slip</div>
    {#if betSlipData.bets.length > 0}
    {#each betSlipData.bets as bet, index}
        <div class="bet-item">
            <div>
                <div><strong>Description:</strong> {bet.description}</div>
                <div><strong>Competitors:</strong> {bet.competitor1} vs {bet.competitor2}</div>
                <div><strong>Game Date:</strong> {bet.gameDate}</div>
                <div><strong>Description:</strong> {bet.description}</div>
                <!-- <div><strong>Bet Date:</strong> {bet.betDate}</div> -->
                <div><strong>Odds:</strong> {bet.odds}</div>

            </div>
            <button class="delete-button" on:click={() => deleteBet(index)}>Delete</button>
        </div>
      {/each}
    {:else}
      <p>No bets added yet.</p>
    {/if}
  
    <div class="bet-summary">
      <div class="form-group">
        <label class="form-label" for="risk-amount">Risk Amount</label>
        <input id="risk-amount" class="form-input" type="number" bind:value={riskAmount}>
      </div>
      <div class="form-group">
        <label class="form-label" for="overall-odds">Overall Odds</label>
        <input id="overall-odds" class="form-input" type="number" bind:value={wagerTotalOdds}>
      </div>
      <div class="form-group">
        <label class="form-label" for="potential-payout">Potential Payout</label>
        <input id="potential-payout" class="form-input" type="text" value={calculatePayout(wagerTotalOdds, riskAmount)} readonly>
      </div>
    </div>
    <div class="form-actions" style="margin-top: 8px;">
      <button class="button button-save" on:click={saveForm}>Save Wager</button>
    </div>
  </div>
