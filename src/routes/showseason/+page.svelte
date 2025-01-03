<script>
    import { onMount } from "svelte";
    import { scheduleStore } from "../../store/showschedule.js";
	import { keys } from "ramda";
  
    let showSchedule = false;
    let schedule = [];
    let wins = 0;
    let losses = 0;
    let playerStats = {};

   // Reactive subscription to the store
   $: scheduleStore.subscribe(({ schedule: games, wins: w, losses: l, playerStats: ps }) => {
    schedule = games;
    wins = w;
    losses = l;
    playerStats = ps;
  });


    // Function to update a game's player field
    const updatePlayer = async (id, player) => {
        await scheduleStore.updateDocument(id, { player });
    };
    const updateScore = async (id, ourscore, oppscore) => {
    await scheduleStore.updateDocument(id, { ourscore, oppscore });
  };

  const scoreOptions = Array.from({ length: 51 }, (_, i) => i); // Generates numbers from 0 to 50

  </script>
  
  <main>
    <h1>Schedule</h1>
    <p>Record: {wins} - {losses}</p> <!-- Display record -->
    {#if playerStats}
        <h2>Player Stats</h2>
        <ul>
        {#each Object.entries(playerStats) as [player, stats]}
            <li>{player}: {stats.wins} - {stats.losses}</li>
        {/each}
        </ul>
    {/if}
    {#if schedule && schedule.length > 0 && showSchedule}
    <p>
        <button on:click={() => {showSchedule = !showSchedule}}>Hide Schedule</button>
    </p>

    <div class="table-container">

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Opponent</th>
            <th>Player</th>
            <th>Phi</th>
            <th>Opp</th>
          </tr>
        </thead>
        <tbody>
          {#each schedule as game, gameNum}
            <tr>
              <td data-label="Game Number">{gameNum+1}</td>
              <td data-label="Opponent">{game.homeAway} {game.opponent}</td>
              <td data-label="Player">
                <!-- Dropdown to select player -->
                <select
                  on:change={(e) => updatePlayer(game.id, e.target.value)}
                  bind:value={game.player}
                >
                  <option value="None" selected={!game.player}>None</option>
                  <option value="Mike" selected={game.player === "Mike"}>Mike</option>
                  <option value="Ken" selected={game.player === "Ken"}>Ken</option>
                </select>
              </td>
              <td data-label="Our Score">
                <select
                  on:change={(e) => updateScore(game.id, parseInt(e.target.value), game.oppscore ?? 0)}
                  bind:value={game.ourscore}
                >
                  {#each scoreOptions as score}
                    <option value={score}>{score}</option>
                  {/each}
                </select>
              </td>
              <td data-label="{game.opponent} Score">
                <select
                  on:change={(e) => updateScore(game.id, game.ourscore ?? 0, parseInt(e.target.value))}
                  bind:value={game.oppscore}
                >
                  {#each scoreOptions as score}
                    <option value={score}>{score}</option>
                  {/each}
                </select>
              </td>
          {/each}
        </tbody>
      </table>
      </div>
    {:else if showSchedule == false}
      <button on:click={() => {showSchedule = !showSchedule}}>Show Schedule</button>
    {:else}
      <p>Loading schedule...</p>
    {/if}
  </main>
 
  <style>
    /* Base table styling */
    table {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }
  
    table, th, td {
      border: 1px solid black;
    }
  
    th, td {
      padding: 8px;
      text-align: center;
    }
  
    th {
      background-color: #f2f2f2;
    }
  
    /* Horizontal scrolling for small screens */
    .table-container {
      overflow-x: auto;
    }
  
    /* Responsive styles for small screens */
    @media (max-width: 768px) {
      table {
        display: block;
        width: 100%;
      }
  
      .table-container {
        margin: 0 -16px; /* Adjust for padding or margin */
      }
  
      thead {
        display: none; /* Hide table headers */
      }
  
      tbody tr {
      display: block;
      width: 100%; /* Make each card take up full width */
      margin-bottom: 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow for better card styling */
      background-color: white; /* Optional background for contrast */
    }
  
      tbody td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        text-align: left;
        border: none;
        border-bottom: 1px solid #eee;
      }
  
      tbody td:last-child {
        border-bottom: none;
      }
  
      tbody td:before {
        content: attr(data-label);
        font-weight: bold;
        flex-shrink: 0;
        margin-right: 8px;
        text-transform: uppercase;
        font-size: 12px;
        color: #555;
      }

          /* Ensure no horizontal scrolling for cards */
    tbody tr {
      margin: 0 auto;
      padding: 0;
    }
    }
  </style> 