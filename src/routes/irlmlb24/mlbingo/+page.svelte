<script>
	import { onMount } from 'svelte';


import { collection, db, doc, query, getDocs } from '../../../firebase.js';
	import { prop, forEach, assoc, assocPath, path, defaultTo} from 'ramda';

    let documentSnapshots = null;
    let teams = [];
    let teamRuns = {};
    const season = "regularseason";

    onMount(async () => {
        console.log("om")
        const teamsCollection = collection(db,`/irl_mlb24/${season}/teams`)
        const teamCollectionQuery = await query(teamsCollection);
        const teamsSnapshot = await getDocs(teamCollectionQuery);
        teams = [];
        teamsSnapshot.forEach(x => teams.push(x.data()))

        forEach(async team => {
            const runsCollection = collection(db,`/irl_mlb24/${season}/teams/${team.abbr}/teamEvents`)
            const runsCollectionQuery = await query(runsCollection);
            const runsSnapshot = await getDocs(runsCollectionQuery)

            teamRuns = assoc(team.abbr, {runs: []})(teamRuns)
            runsSnapshot.forEach(x => {
                console.log(`id: ${x.id}, count: ${x.data().count}`)
                teamRuns = assocPath([team.abbr,x.id],x.data().count)(teamRuns)

            })


        })(teams)


    })

    const defaultRuns = defaultTo(0)

    const getRuns = (team, runs, tr) => {
        return defaultRuns((prop((runs).toString(),prop(team,tr))))
        // return path([team,runs],teamRuns)
    }
</script>
<h2>MLB Bingo 15</h2>

<table style="border: solid 1px green;">
<tr>
    <th colspan=2>Team</th>
    {#each {length: 16} as _, i}
        <th>{i}</th>
    {/each}
</tr>
{#each teams as team,i}
<tr>
    <th> 
        {team.abbr}
    </th>
    <th> 
        {team.owner}
    </th>
    {#each {length: 16} as _, i}
        {#if getRuns(team.abbr,(i).toString(),teamRuns) == 0}
            <td style="background-color: red">x</td>
        {:else}
            <td style="background-color: green">{getRuns(team.abbr,(i).toString(),teamRuns)}</td>
        {/if}

    {/each}
</tr>
{/each}
</table>


<style>
    tr {
        border: solid 1px black;
        padding: 8px;
    }
    td, th {
        padding: 8px;
        border: solid 1px black;
    }
</style>