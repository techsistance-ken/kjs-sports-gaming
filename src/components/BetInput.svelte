<script>
	import { map, prop, toLower } from 'ramda';
	import { get } from 'svelte/store';
	import { NFLTeams } from '../store/NFLTeams';
    import { addWager } from '../store/wagerStore';
	import BetSlip from './betinputs/BetSlip.svelte';
    import FootballCompetition from './betinputs/FootballCompetition.svelte';
    import FootballSpread from './betinputs/FootballSpread.svelte'
    import FootballMoneyLine from './betinputs/FootballMoneyLine.svelte'
    import FootballOverUnder from './betinputs/FootballOverUnder.svelte'
    import FootballGameProp from './betinputs/FootballGameProp.svelte'


    export let sport = "";
    export let league = "";
    export let user = null;

	let betSlipRef;
	let riskAmount = 10;
	let wagerTotalOdds = -110;

	let competitionData = {
		homeTeam: '',
		awayTeam: '',
		gameDate: '',
		betType: ''
	};

	let fullBetData = {
		description: '',
		odds: 0,
		threshold: 0,
		subject: '',
		vsSubject: '',
		overUnder: '',
		subDesc: ''
	};

	let betTypeSelected = '';

	let nflTeams = get(NFLTeams); // fetch all teams from the store
	// Bet types and their corresponding forms
	const betTypes = [
		'Spread',
		'Moneyline',
		'Over Under',
		'Game Prop',
		'Game Special',
		'Player Prop',
		'Player Special',
		'TD Scorer'
	];

	function saveForm() {
		betSlipRef.addBet({
			description: fullBetData.description,
			competitor1: competitionData.homeTeam,
			competitor2: competitionData.awayTeam,
			gameDate: competitionData.gameDate,
            threshold: fullBetData.threshold,
            subject: fullBetData.subject,
            vsSubject: fullBetData.vsSubject,
			odds: fullBetData.odds
		});
	}

	function cancelForm() {
		competitionData = {
			homeTeam: '',
			awayTeam: '',
			gameDate: '',
			betType: ''
		};
		betTypeSelected = '';
	}

	function changeBetType() {
		betTypeSelected = competitionData.betType;
	}

    function getFootballTeams() {
        if(toLower(sport) == "football" && toLower(league) == "nfl") {
            return nflTeams;
        }
        return [];
    }


    function saveAWager(wagerSaveEvent) {
        const wager = wagerSaveEvent.detail

        console.log("BetInput - SaveAWager")
        console.log(wager)
        if(user) {
            console.log(`adding Wager for: ${user.email}`)
            addWager(user.uid, wager)

        }
    }
</script>

<div class="form-container">
    {#if toLower(sport) == "football"}
        <FootballCompetition
            {betTypes}
            on:betTypeChange={changeBetType}
            data={competitionData}
            teamsList={map(prop('teamName'))(getFootballTeams())}
        />
        {#if betTypeSelected == 'Spread'}
            <FootballSpread
                on:anyUpdate={(d) => {
                    console.log('hi', d);
                    fullBetData = d.detail;
                }}
                {competitionData}
            />
        {:else if betTypeSelected == 'Moneyline'}
            <FootballMoneyLine
                on:anyUpdate={(d) => {
                    console.log('hi', d);
                    fullBetData = d.detail;
                }}
                {competitionData}
            />
        {:else if betTypeSelected == 'Over Under'}
            <FootballOverUnder
                on:anyUpdate={(d) => {
                    console.log('hi', d);
                    fullBetData = d.detail;
                }}
                {competitionData}
            />
        {/if}
    {/if}

	<div class="form-actions">
		<button class="button button-save" on:click={saveForm}>Add to Betslip</button>
		<button class="button button-cancel" on:click={cancelForm}>Clear Bet</button>
	</div>
</div>

<div>
    {#if user}
        <BetSlip bind:this={betSlipRef} on:saveWager={saveAWager}/>
    {:else}
        Sign In to create a bet slip
    {/if}
</div>

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
		border-color: #007bff;
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
		background-color: #007bff;
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
</style>
