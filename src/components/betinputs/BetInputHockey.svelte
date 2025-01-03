<script>
	import { assoc, path, map, keys, propEq, prop, length, mergeAll } from 'ramda';
	import { get } from 'svelte/store';
	import { NFLTeams } from '../../store/NFLTeams';
	import { writable } from 'svelte/store';
	import BetSlip from './BetSlip.svelte';
	import { Button } from 'carbon-components-svelte';
	import BetFields from './BetFields.svelte';

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
</script>

<div class="form-container">
	<FootballCompetition
		{betTypes}
		on:betTypeChange={changeBetType}
		data={competitionData}
		teamsList={map(prop('teamName'))(nflTeams)}
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
	<div class="form-actions">
		<button class="button button-save" on:click={saveForm}>Add to Betslip</button>
		<button class="button button-cancel" on:click={cancelForm}>Clear Bet</button>
	</div>
</div>

<BetSlip bind:this={betSlipRef} />

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
