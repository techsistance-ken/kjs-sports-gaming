<script>
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import { prop } from 'ramda';
    import SinglStat from '../../../../../../src/components/stats/singlStat.svelte';

        /** @type {import('./$types').PageData} */
        export let data;


        let bgColor = "#DDDDEE";
        $: dyncss = `--row-bg-color=yellow;`


        const getdyncss = index => index % 2 == 0 ? `--row-bg-color:#F3FFFF;` : `--row-bg-color:#FFFFF3;`




</script>
<h2>Club Information</h2>

{#if data.data.status === "error"}
    No Data
{:else}

<!-- {JSON.stringify(data.data)} -->

<div class="stat-card clubdata">
    <Grid>
        <Row>
        <Column><SinglStat label="Division" value={prop("0",data.data).stats.currentDivision} /></Column>
        <Column><SinglStat label="Seasons" value={prop("0",data.data).stats.seasons} /></Column>
        <Column><SinglStat label="Titles" value={prop("0",data.data).stats.titles} /></Column>
        <Column><SinglStat label="Goals Allowed" value={prop("0",data.data).stats.goalsAgainst} /></Column>
        </Row>
    </Grid>
</div>
<div class="stat-card members">
    <h4>Members</h4>
    <Grid>
        {#each prop("1",data.data).members as member, index}
            <Row class="row" style="padding: 4px; {getdyncss(index)}">
                <Column><SinglStat label="Name" value={member.name} /></Column>
                <Column><SinglStat label="Position" value={member.favoritePosition} /></Column>
                <Column><SinglStat label="Record" value={member.record} /></Column>
                <Column><SinglStat label="+/-" value={member.plusmin} /></Column>
                <Column><SinglStat label="G PG" value={`${(member.goals/member.gamesplayed).toFixed(2)}`} /></Column>
                <Column><SinglStat label="A PG" value={`${(member.assists/member.gamesplayed).toFixed(2)}`} /></Column>
                <Column><SinglStat label="Hits PG" value={member.hitspg} /></Column>
                <Column><SinglStat label="Faceoff %" value={member.fop} /></Column>
                <Column><SinglStat label="Pen. Shot %" value={member.penaltyshotpct} /></Column>
                <Column><SinglStat label="Dekes" value={`${member.dekesmade} of ${member.dekes}`} /></Column>
            </Row>
        {/each}
    </Grid>
</div>
{/if}


<style>
    :global(.row) {
        background-color: var(--row-bg-color,#eeeeee);
    }
    .stat-card {
        width: 96%;
    }
</style>