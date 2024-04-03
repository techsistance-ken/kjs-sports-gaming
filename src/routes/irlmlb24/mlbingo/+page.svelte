<script>
import { onMount } from 'svelte';
import { Timestamp, collection, db, getDoc, doc, query, getDocs } from '../../../firebase.js';
import { keys, prop, forEach, assoc, assocPath, length, defaultTo, range, groupBy, identity} from 'ramda';

    let documentSnapshots = null;
    let teams = [];
    let teamRuns = {};
    const season = "regularseason";

    let last15 = "Noneo"
    let potsplit_15 = [];

    let potsplit_15Test = ["sd","cws","cws","nyy"]
    let groupPotTest = {
        "SD": ["SD"],
        "CWS": ["CWS","CSS"],
        "NYY": ["NYY"]
    }
    const nl_teams = [
        "ARI",
        "ATL",
        "CHC",
        "CIN",
        "COL",
        "LAD",
        "MIA",
        "MIL",
        "NYM",
        "OAK",
        "PHI",
        "PIT",
        "SD",
        "SF",
        "STL",
        "WSH"
    ]

    let groupPot = {};

    let lastUpdate = null
    onMount(async () => {
        const teamsCollection = collection(db,`/irl_mlb24/${season}/teams`)
        const teamCollectionQuery = await query(teamsCollection);
        const teamsSnapshot = await getDocs(teamCollectionQuery);
        teams = [];
        teamsSnapshot.forEach(x => teams.push(x.data()))

        forEach(async team => {
            const runsCollection = collection(db,`/irl_mlb24/${season}/teams/${team.abbr}/teamEvents`)
            const runsCollectionQuery = await query(runsCollection);
            const runsSnapshot = await getDocs(runsCollectionQuery)

            const docRef = doc(db, "irl_mlb24", season);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                lastUpdate = docSnap.data();
            } else {
                console.log("No such document!");
            }

            teamRuns = assoc(team.abbr, {runs: []})(teamRuns)
            runsSnapshot.forEach(x => {
                const runCount = x.data().count
                teamRuns = assocPath([team.abbr,x.id],runCount)(teamRuns)

                if(x.id == 15 && runCount > 0) {
                    last15 = team.abbr
                    range(0,runCount).forEach(runElem => {

                        potsplit_15 = [...potsplit_15,team.abbr]
                        groupPot = groupBy(identity)(potsplit_15)
                    })
                }

            })


        })(teams)







    })

    const defaultRuns = defaultTo(0)

    const getRuns = (team, runs, tr) => {
        return defaultRuns((prop((runs).toString(),prop(team,tr))))
        // return path([team,runs],teamRuns)
    }

    const potPerShare = (shares,total) => {
        return total == 0 ? 0 : (2500 / total * shares).toFixed(0)
    }

</script>
<div class="mymobile">
    <h2>MLB Bingo 15</h2>
    <p>Last Update {lastUpdate ? `${new Date(lastUpdate.lastUpdate.seconds*1000).toLocaleDateString()} ${new Date(lastUpdate.lastUpdate.seconds*1000).toLocaleTimeString()}` : ""}</p>
    

    <table style="border: solid 1px green;">
    <tr>
        <th colspan=2>NL Team</th>
        {#each {length: 16} as _, i}
            <th>{i}</th>
        {/each}
    </tr>

    {#each teams as team,i}
    {#if nl_teams.indexOf(team.abbr) >= 0}
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
    {/if}
    {/each}
    <tr>
        <th colspan=2>AL Team</th>
        {#each {length: 16} as _, i}
            <th>{i}</th>
        {/each}
    </tr>
    {#each teams as team,i}
    {#if nl_teams.indexOf(team.abbr) < 0}
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
    {/if}
    {/each}
    </table>
    <br><br>

    <h4>15 Runs Pot (Split 2,500)</h4>
    <table>
    <tr><th>Team</th><th>Shares</th><th>Total</th></tr>
    {#each keys(groupPot) as team}
        <tr><td>{team}</td><td>{prop(team)(groupPot).length}</td><td>{potPerShare(prop(team,groupPot).length,potsplit_15.length)} </td></tr>
    {/each}
    </table>



</div>
<style>
    tr {
        border: solid 1px black;
        padding: 8px;
    }
    td, th {
        padding: 8px;
        border: solid 1px black;
    }

    .mymobile {
        padding: 12px;
    }
</style>