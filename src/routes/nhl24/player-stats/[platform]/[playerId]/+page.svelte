<script>
  import { Modal, Grid, Row, Column, Tile, Loading, ExpandableTile, StructuredList, StructuredListHead, StructuredListRow, StructuredListCell, StructuredListBody } from "carbon-components-svelte";
	import { keys, sort, sortBy, toPairs } from "ramda";
  import SingleStat from "../../../../../components/stats/singlStat.svelte"

  /** @type {import('./$types').PageData} */
  export let data;
  let open = false;
  let clickedGame;
  const clickAGame = game => {
    open = true;
    clickedGame = game;
  }
</script>

<h2>Stats for {data.playerStats.name}</h2>

<div>
<ExpandableTile>
  <div slot="above">
    <Grid>
      <Row>
        <Column sm={1} md={1}>
          <SingleStat label="GAMES" value={data.playerStats.gamesPlayed} />
        </Column>
        <Column sm={3} md={5}>
          <SingleStat label="RECORD" value="{data.playerStats.wins}-{data.playerStats.losses}-{data.playerStats.otl}" />
        </Column>
      </Row>
      <Row>
        <Column>
          <SingleStat label="POINTS" value={data.playerStats.points} />
        </Column>
        <Column>
          <SingleStat label="GOALS" value={data.playerStats.goals} />
        </Column>
        <Column>
          <SingleStat label="ASSISTS" value={data.playerStats.assists} />
        </Column>
      </Row>
    </Grid>

  </div>
  <div slot="below">
    <Grid>
      <Row>
        <Column>
          <SingleStat label="HAT TRICKS" value={data.playerStats.hatTricks} />
        </Column>
        <Column>
          <SingleStat label="PLUS MINUS" value={data.playerStats.plusMinus} />
        </Column>
        <Column>
          <SingleStat label="GAME WINNERS" value={data.playerStats.gameWinners} />
        </Column>
      </Row>
    </Grid>
  </div>
</ExpandableTile>

<ExpandableTile>
  <div slot=above><p><b>Breakaways:</b> {data.playerStats.breakawayGoals}-{data.playerStats.breakaways}</p></div>
  <div slot="below">
    <Grid>
      <Row>
        <Column>
          <SingleStat label="Breakaways" value={data.playerStats.breakaways} />
        </Column>
        <Column>
          <SingleStat label="Breakaway Goals" value={data.playerStats.breakawayGoals} />
        </Column>
        <Column>
          <SingleStat label="Breakaway %" value={data.playerStats.breakawayPct} />
        </Column>
      </Row>
    </Grid>
  </div>
</ExpandableTile>

<ExpandableTile>
  <div slot=above><p><b>Penalty Shots:</b> {data.playerStats.penaltyGoals}-{data.playerStats.penaltyAttempts}</p></div>
  <div slot="below">
    <Grid>
      <Row>
        <Column>
          <SingleStat label="Drawn" value={data.playerStats.penaltiesDrawn} />
        </Column>
        <Column>
          <SingleStat label="Attempted" value={data.playerStats.penaltyAttempts} />
        </Column>
        <Column>
          <SingleStat label="Goals" value={data.playerStats.penaltyGoals} />
        </Column>
        <Column>
          <SingleStat label="Penalty Shot %" value={data.playerStats.peanltyPct} />
        </Column>
      </Row>
    </Grid>
  </div>
</ExpandableTile>

<ExpandableTile>
  <div slot=above><p><b>Faceoffs:</b> {data.playerStats.faceoffPct}</p></div>
  <div slot="below">
    <Grid>
      <Row>
        <Column>
          <SingleStat label="Total" value={data.playerStats.faceoffs} />
        </Column>
        <Column>
          <SingleStat label="Won" value={data.playerStats.faceoffsWon} />
        </Column>
        <Column>
          <SingleStat label="Lost" value={data.playerStats.faceoffsLost} />
        </Column>
        <Column>
          <SingleStat label="Faceoff %" value={data.playerStats.faceoffPct} />
        </Column>
      </Row>
    </Grid>
  </div>
</ExpandableTile>

<ExpandableTile>
  <div slot=above><p><b>Shooting:</b> {data.playerStats.shotPct}%</p></div>
  <div slot="below">
    <Grid>
      <Row>
        <Column>
          <SingleStat label="TOTAL" value={data.playerStats.shots} />
        </Column>
        <Column>
          <SingleStat label="ON NET" value={data.playerStats.shotsOnNetPct} />
        </Column>
        <Column>
          <SingleStat label="PER GAME" value={data.playerStats.shotsPerGame} />
        </Column>
        <Column>
          <SingleStat label="SHOOTING %" value={data.playerStats.shotPct} />
        </Column>
      </Row>
    </Grid>
  </div>
</ExpandableTile>

<ExpandableTile>
  <div slot=above><p><b>Passing:</b> {data.playerStats.passPct}%</p></div>
  <div slot="below">
    <Grid>
      <Row>
        <Column>
          <SingleStat label="TOTAL" value={data.playerStats.passAttempts} />
        </Column>
        <Column>
          <SingleStat label="PASSES" value={data.playerStats.passes} />
        </Column>
        <Column>
          <SingleStat label="SAUCERS" value={data.playerStats.saucers} />
        </Column>
        <Column>
          <SingleStat label="PASSING %" value={data.playerStats.passPct} />
        </Column>
      </Row>
    </Grid>
  </div>
</ExpandableTile>
</div>
<Tile>
    <StructuredList selection >
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell sm={0} md={8} lg={8} xlg={8} max={8} head>Oponnent</StructuredListCell>
          <StructuredListCell head>Result</StructuredListCell>
          <StructuredListCell head>Goals</StructuredListCell>
          <StructuredListCell head>Assists</StructuredListCell>
          <StructuredListCell head>hits</StructuredListCell>
          <StructuredListCell head>plusMinus</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      {#each data.playerStats.gameHistory as game, i}
      <StructuredListRow on:click={() => clickAGame(game)} for="row-{game.matchId}">
        <StructuredListCell noWrap>{game.oName}</StructuredListCell>
        <StructuredListCell noWrap>
          <div>
            <div>{game.result}</div><div>{game.score}</div>
          </div>
        </StructuredListCell>
        <StructuredListCell noWrap>{game.goals}</StructuredListCell>
        <StructuredListCell noWrap>{game.assists}</StructuredListCell>
        <StructuredListCell>{game.hits}</StructuredListCell>
        <StructuredListCell>{game.plusMinus}</StructuredListCell>
      </StructuredListRow>
      {/each} 
    </StructuredList>
    <Modal passiveModal bind:open modalHeading="Game History" on:open on:close>
        <p>Game: {clickedGame ? clickedGame.matchId : "Not Found"}</p>
        <StructuredList>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Label</StructuredListCell>
              <StructuredListCell head>Value</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>

            {#each sortBy(y => y[0],toPairs(clickedGame)) as x}
            <StructuredListRow >
              <StructuredListCell>{x[0]}</StructuredListCell>
              <StructuredListCell>{x[1]}</StructuredListCell>
            </StructuredListRow>
            {/each}
          </StructuredListBody>

        </StructuredList>
    </Modal>
      

</Tile>
