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
  </script>
  
  <main>
    <h1>Schedule</h1>
    <p>Record: {wins} - {losses}</p> <!-- Display record -->
    <h2>Player Stats</h2>
    <ul>
      {#each Object.entries(playerStats) as [player, stats]}
        <li>{player}: {stats.wins} - {stats.losses}</li>
      {/each}
    </ul>
    {#if schedule && schedule.length > 0 && showSchedule}
    <p>
        <button on:click={() => {showSchedule = !showSchedule}}>Hide Schedule</button>
    </p>
      <table>
        <thead>
          <tr>
            <th>Opponent</th>
            <th>Our Score</th>
            <th>Opp Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each schedule as game}
            <tr>
              <td>{game.homeAway} {game.opponent}</td>
              <td>{game.ourscore ?? 0}</td> <!-- Default to 0 if undefined or null -->
              <td>{game.oppscore ?? 0}</td> <!-- Default to 0 if undefined or null -->
              <td>
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
              <td>
                <button on:click={() => updateScore(game.id, (game.ourscore ?? 0) - 1, game.oppscore ?? 0)} disabled={(game.ourscore ?? 0) <= 0}>-</button>
                {game.ourscore ?? 0}
                <button on:click={() => updateScore(game.id, (game.ourscore ?? 0) + 1, game.oppscore ?? 0)}>+</button>
              </td>
              <td>
                <button on:click={() => updateScore(game.id, game.ourscore ?? 0, (game.oppscore ?? 0) - 1)} disabled={(game.oppscore ?? 0) <= 0}>-</button>
                {game.oppscore ?? 0}
                <button on:click={() => updateScore(game.id, game.ourscore ?? 0, (game.oppscore ?? 0) + 1)}>+</button>
              </td>
          {/each}
        </tbody>
      </table>
    {:else if showSchedule == false}
      <button on:click={() => {showSchedule = !showSchedule}}>Show Schedule</button>
    {:else}
      <p>Loading schedule...</p>
    {/if}
  </main>
  