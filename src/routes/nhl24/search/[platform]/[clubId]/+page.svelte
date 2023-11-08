<script>
	import { Breadcrumb, BreadcrumbItem, Column, Grid, Row } from 'carbon-components-svelte';
	import { prop } from 'ramda';
    import SinglStat from '../../../../../../src/components/stats/singlStat.svelte';

        /** @type {import('./$types').PageData} */
        export let data;


        let bgColor = "#DDDDEE";
        $: dyncss = `--row-bg-color=yellow;`


        const getdyncss = index => index % 2 == 0 ? `--row-bg-color:#F3FFFF;` : `--row-bg-color:#FFFFF3;`




</script>

<Breadcrumb noTrailingSlash>
    <BreadcrumbItem href="/nhl24/search">Search</BreadcrumbItem>
    <BreadcrumbItem>Respect the Indian</BreadcrumbItem>
</Breadcrumb>
<br>
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
        {#each prop("1",data.data).members as member, index}
        <div class="member-container">

        <div class="member-header">
            <div class="member-header-name">
                {member.name}
            </div>
            <div class="member-header-info">
                {member.favoritePosition} | {member.record} | {member.clientPlatform}
            </div>
        </div>
        <div class="stat-block-container">
            <div class="stat-block">
               <div class="stat-label">
                 GP
              </div>
              <div class="stat-value">
                {member.gp} 
              </div>
           </div>   
           <div class="stat-block">
               <div class="stat-label">
                 G
              </div>
              <div class="stat-value">
                {member.goals} 
              </div>
           </div>
           <div class="stat-block">
               <div class="stat-label">
                 A
              </div>
              <div class="stat-value">
                {member.assists} 
              </div>
           </div>
           <div class="stat-block">
               <div class="stat-label">
                P
              </div>
              <div class="stat-value">
                {member.points}
              </div>
           </div>
           <div class="stat-block">
               <div class="stat-label">
                +/- 
              </div>
              <div class="stat-value">
                {member.plusmin}
              </div>
           </div>
            <!-- <Row class="row" style="padding: 4px; {getdyncss(index)}">
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
                <Column><SinglStat label="Brkawy %" value={member.breakawaypct} /></Column>
            </Row> -->
        </div>
        </div>
        
        {/each}
</div>
{/if}


<style>

    .stat-block-container {
  background-color: #F6F6F6;
  border-radius: 8px;
  display: inline-flex;
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;

}


.stat-block:last-child {
    border-right: 0;

}
.stat-block:first-child {
}

.stat-block {
  min-width: 56px;
  padding: 6px;
  flex-grow: 1;
  border-right: solid 1px gray;
  justify-content: center;
  align-items: center;
}
.stat-label {
  font-weight: bolder;
  font-size: bigger;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-value {
  display: flex;
  align-items: center;
  justify-content: center; 
}
.members {
    display: flex;
    flex-direction: column;
}
.member-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;;
}
.member-header-name {
    font-size: large;
    font-weight: bolder;
    margin-bottom: 8px;
}
.member-container {
    border: solid 1px gray;
    margin: 8px;
    padding: 16px;
    border-radius: 8px;
    background-color: #FED8B1;
}
</style>