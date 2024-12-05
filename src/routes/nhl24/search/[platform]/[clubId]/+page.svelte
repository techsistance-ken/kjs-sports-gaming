<script>
	import { Accordion, AccordionItem, Breadcrumb, BreadcrumbItem, Button, Column, Grid, RadioButton, RadioButtonGroup, Row, Tag, Toggle, Tooltip } from 'carbon-components-svelte';
	import { map, prop } from 'ramda';
    import SinglStat from '../../../../../../src/components/stats/singlStat.svelte';
	import GameHistoryTable from '../../../../../../src/components/GameHistoryTable.svelte';
	import { collection, db, doc, getDoc } from '../../../../../firebase.js';
    import Star from "carbon-icons-svelte/lib/Star.svelte";
	import ClubFavorite from '../../../../../components/ClubFavorite.svelte';

        const loadClubFromDb = (platform,clubId) => {
            getDoc(doc(collection(db,`/nhl24/ps5/clubs`),clubId))
              .then(x => alert(x.get("name")))
              .catch(e => alert(e))
        }

        /** @type {import('./$types').PageData} */
        export let data;


        let bgColor = "#DDDDEE";
        let memberStatHidden = [];
        let showMembers = true;
        let showSchedule = true;
        $: dyncss = `--row-bg-color=yellow;`


        const getdyncss = index => index % 2 == 0 ? `--row-bg-color:#F3FFFF;` : `--row-bg-color:#FFFFF3;`

        const schedules = ["Season Matches", "Finals Matches"];;
        let selectedSchedule = schedules[0];


        const NDX_CLUB_STATS = "0";
        const NDX_MEMBER_STATS = "1";
        const NDX_CLUB_INFO = "2";
        const NDX_SEASONS_MATCHES = "3";
        const NDX_FINALS_MATCHES = "4";

</script>


{#if data.data.status === "error"}
<Breadcrumb noTrailingSlash>
    <BreadcrumbItem href="/nhl24">Home</BreadcrumbItem>
    <BreadcrumbItem href="/nhl24/search">Search</BreadcrumbItem>
</Breadcrumb>
   <h2>No Data</h2> 
{:else}

<!-- {JSON.stringify(prop(NDX_CLUB_INFO,data.data))} -->

<Breadcrumb noTrailingSlash>
    <BreadcrumbItem href="/nhl24">Home</BreadcrumbItem>
    <BreadcrumbItem href="/nhl24/search">Search</BreadcrumbItem>
    <BreadcrumbItem>{prop(NDX_CLUB_INFO,data.data).info.name}</BreadcrumbItem>
</Breadcrumb>
<!-- <h2>Load From DB</h2>
<Button on:click={() => loadClubFromDb(data.platform,data.clubId)}>Load From FB</Button>
<br> -->
<h2>Club Information</h2>
<div style="margin: 12px 0 18px; 0; display: flex; width: 98%; justify-content: center; align-items: center; flex-direction: column;">
    <h3 style="align-self: center;">{prop(NDX_CLUB_INFO,data.data).info.name}</h3>
    <h4 style="align-self: center;">{prop(NDX_CLUB_STATS,data.data).stats.record}</h4>
    <div>
        <ClubFavorite clubName={prop(NDX_CLUB_INFO,data.data).info.name} clubId={prop(NDX_CLUB_INFO,data.data).id} platform={prop(NDX_CLUB_INFO,data.data).platform}/>
    </div>

</div>
<!-- {JSON.stringify(data.data)} -->

<div class="stat-card clubdata">
    <Grid>
        <Row>
        <Column><SinglStat label="Division" value={prop(NDX_CLUB_STATS,data.data).stats.currentDivision} /></Column>
        <Column><SinglStat label="Seasons" value={prop(NDX_CLUB_STATS,data.data).stats.seasons} /></Column>
        <Column><SinglStat label="Titles" value={prop(NDX_CLUB_STATS,data.data).stats.titles} /></Column>
        <Column><SinglStat label="Goals Allowed" value={prop(NDX_CLUB_STATS,data.data).stats.goalsAgainst} /></Column>
        </Row>
    </Grid>
</div>
<div style="margin-top: 12px;">
    <span>Show: </span> 
    <Tag type={showMembers ? "green" : "red"} on:click={() => showMembers = !showMembers} interactive>Members</Tag> 
    <Tag type={showSchedule ? "green" : "red"} on:click={() => showSchedule = !showSchedule} interactive>Schedule</Tag> 
</div>
<div hidden={!showMembers}>
<div class="stat-card members">
<h4>Members</h4>
        {#each prop(NDX_MEMBER_STATS,data.data).members as member, index}
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


          <Accordion align="start">
            <AccordionItem title="More Stats">
                <div class="ind-stat-card">
                    <div class="ind-stat-label">
                    Breakaways
                    </div>
                    <div class="ind-stat-value">
                    {member.brkgoals}-{member.breakaways} ({member.breakawaypct}%)
                    </div>
                </div>  
                <div class="ind-stat-card">
                    <div class="ind-stat-label">
                        Faceoffs
                    </div>
                    <div class="ind-stat-value">
                    W:{member.fow} L:{member.fol} ({member.fop}%)
                    </div>
                </div>  
                <div class="ind-stat-card">
                    <div class="ind-stat-label">
                        Pen. Shots
                    </div>
                    <div class="ind-stat-value">
                    {member.penaltyshotgoals}-{member.penaltyattempts} ({member.penaltyshotpct}%)
                    </div>
                </div>  
                <div class="ind-stat-card">
                    <div class="ind-stat-label">
                        Hits
                    </div>
                    <div class="ind-stat-value">
                    {member.hits} avg: {member.hitspg}
                    </div>
                </div>  
                <div class="ind-stat-card">
                    <div class="ind-stat-label">
                        Dekes 
                    </div>
                    <div class="ind-stat-value">
                    {member.dekesmade}-{member.dekes} {member.dekes === "0" ? "0" : ((parseInt(member.dekesmade)/parseInt(member.dekes))*100).toFixed(1)}%
                    </div>
                </div>  
                <div class="ind-stat-card">
                    <div class="ind-stat-label">
                      Hat Tricks 
                    </div>
                    <div class="ind-stat-value">
                    {member.hattricks} 
                    </div>
                </div>  
                <div class="ind-stat-card">
                    <div class="ind-stat-label">
                      Passing
                    </div>
                    <div class="ind-stat-value">
                    {member.passes}-{member.passattempts} ({member.passpct}%) 
                    </div>
                </div>  
                <div class="ind-stat-card">
                    <div class="ind-stat-label">
                      Defense 
                    </div>
                    <div class="ind-stat-value">
                      <Tooltip direction="right">
                        <p>BS: Blocked Shots</p>
                        <p>D: Deflections</p>
                      </Tooltip> 
                    &nbsp;&nbsp;BS:{member.bs} D:{member.deflections}
                    </div>
                </div>  
                <div class="ind-stat-card">
                    <div class="ind-stat-label">
                        Turnovers
                    </div>
                    <div class="ind-stat-value">
                      <Tooltip direction="right">
                        <p>G: Giveaways</p>
                        <p>T: Takeaways</p>
                        <p>I: Interceptions</p>
                      </Tooltip> 
                     &nbsp;&nbsp;G:{member.giveaways} T:{member.takeaways} I:{member.interceptions}
                    </div>
                </div>  
    </AccordionItem>
    </Accordion>
    </div>
        
        {/each}
</div>
</div>

<div style="margin-top: 18px;" hidden={!showSchedule}>
<div class="stat-card schedule">
<h4>Schedule</h4>
<RadioButtonGroup
  legendText="Schedule Type"
  name="selectedSchedule"
  bind:selected={selectedSchedule}
>
  {#each schedules as value (value)}
    <RadioButton labelText={value} {value} />
  {/each}
</RadioButtonGroup>
    {#if selectedSchedule === schedules[0]}
        <GameHistoryTable matches={map(x => x.matchStats)(prop(NDX_SEASONS_MATCHES,data.data).matches)} />
    {:else}
        <GameHistoryTable matches={map(x => x.matchStats)(prop(NDX_FINALS_MATCHES,data.data).matches)} />
    {/if}
</div>
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

.ind-stat-card {
  display: inline-flex;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: #F6F6F6;
  border-radius: 4px;
  padding: 10px;
}
.ind-stat-label {
  font-weight: bolder;
  margin-right: 8px;
}
.ind-stat-value {
    display: inline-flex;
}
</style>