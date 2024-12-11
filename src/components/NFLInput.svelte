<script>
    import { NFLTeams } from "../store/NFLTeams";
    // @ts-ignore
    import Autocomplete from "./AutoComplete.svelte";
    import { get } from "svelte/store";

    let teams = get(NFLTeams); // Fetch all teams from the store
    let homeTeam = "";
    let awayTeam = "";

    // Filtered lists for home and away team
    $: availableHomeTeams = teams
        .filter(team => team.name !== awayTeam)
        .map(team => team.name);

    $: availableAwayTeams = teams
        .filter(team => team.name !== homeTeam)
        .map(team => team.name);
</script>

<div>
    <label for="home-team">Home Team</label>
    <Autocomplete
        id="home-team"
        items={availableHomeTeams}
        bind:value={homeTeam}
        enforceSelection={true}
    />
</div>

<div>
    <label for="away-team">Away Team</label>
    <Autocomplete
        id="away-team"
        items={availableAwayTeams}
        bind:value={awayTeam}
        enforceSelection={true}
    />
</div>

<p>
    Selected Teams: Home - {homeTeam || "None"}, Away - {awayTeam || "None"}
</p>
