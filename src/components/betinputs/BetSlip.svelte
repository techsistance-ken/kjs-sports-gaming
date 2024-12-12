<script>
	import {map, prop, length, append} from "ramda";

	let riskAmount = 10;
	let wagerTotalOdds = -110;
	/**
	 * @type {any[]}
	 */
	let bets = [];

	// Example function to add a bet to the BetSlip
	/**
	 * @param {any} bet
	 */
	function addBet(bet) {
			bets = append(bet)(bets)
		    wagerTotalOdds = calculateParlayOdds(map(prop('odds'))(bets));
	}
	// Function to delete a bet from the BetSlip
	/**
	 * @param {number} index
	 */
	function deleteBet(index) {
		const updatedBets = bets.filter((_, i) => i !== index);
		bets = updatedBets;
		wagerTotalOdds = calculateParlayOdds(map(prop('odds'))(bets));
	}

	export {addBet}

	/**
	 * @param {number} odds
	 * @param {number} risk
	 */
	function calculatePayout(odds, risk) {
		let payout;
		if (odds > 0) {
			payout = (odds / 100) * risk;
		} else {
			payout = (100 / Math.abs(odds)) * risk;
		}
		return `$${(+risk + payout).toFixed(2)}`; // Format payout as currency with two decimals
	}

	/**
	 * @param {string | any[]} oddsArray
	 */
	function calculateParlayOdds(oddsArray) {
		let decimalOdds = 1;
		if (length(oddsArray) == 1) {
			return oddsArray[0];
		}

		// Convert each American odds to decimal odds and multiply
		for (let i = 0; i < oddsArray.length; i++) {
			let odds = oddsArray[i];
			let decimal;

			if (odds > 0) {
				// Convert positive American odds to decimal
				decimal = odds / 100 + 1;
			} else {
				// Convert negative American odds to decimal
				decimal = 100 / Math.abs(odds) + 1;
			}

			decimalOdds *= decimal;
		}

		// Convert the final decimal odds back to American odds
		let parlayOdds;
		if (decimalOdds > 2) {
			// Positive American odds
			parlayOdds = Math.round((decimalOdds - 1) * 100);
		} else {
			// Negative American odds
			parlayOdds = -Math.round(100 / (decimalOdds - 1));
		}

		return parlayOdds;
	}
	const saveWager = () => {
		console.log('Save Wager');
	};
</script>

<div class="bet-slip-container">
	<div class="bet-slip-header">Bet Slip</div>
	{#if bets.length > 0}
		{#each bets as bet, index}
			<div class="bet-item">
				<div>
					<div><strong>Description:</strong> {bet.description}</div>
					<div><strong>Competitors:</strong> {bet.competitor1} vs {bet.competitor2}</div>
					<div><strong>Game Date:</strong> {bet.gameDate}</div>
					<!-- <div><strong>Bet Date:</strong> {bet.betDate}</div> -->
					<div><strong>Odds:</strong> {bet.odds}</div>
				</div>
				<button class="delete-button" on:click={() => deleteBet(index)}>Delete</button>
			</div>
		{/each}
	{:else}
		<p>No bets added yet.</p>
	{/if}

	<div class="bet-summary">
		<div class="form-group">
			<label class="form-label" for="risk-amount">Risk Amount</label>
			<input id="risk-amount" class="form-input" type="number" bind:value={riskAmount} />
		</div>
		<div class="form-group">
			<label class="form-label" for="overall-odds">Overall Odds</label>
			<input id="overall-odds" class="form-input" type="number" bind:value={wagerTotalOdds} />
		</div>
		<div class="form-group">
			<label class="form-label" for="potential-payout">Potential Payout</label>
			<input
				id="potential-payout"
				class="form-input"
				type="text"
				value={calculatePayout(wagerTotalOdds, riskAmount)}
				readonly
			/>
		</div>
	</div>
	<div class="form-actions" style="margin-top: 8px;">
		<button class="button button-save" on:click={saveWager}>Save Wager</button>
	</div>
</div>

<style>
	.bet-slip-container {
		margin-top: 2rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #f9f9f9;
	}

	.bet-slip-header {
		font-size: 1.25rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.bet-item {
		margin-bottom: 0.5rem;
		padding: 0.5rem;
		border-bottom: 1px solid #ddd;
	}

	.bet-summary {
		margin-top: 1rem;
	}
	.delete-button {
		background-color: #dc3545;
		color: #fff;
		padding: 0.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.875rem;
	}

	.delete-button:hover {
		background-color: #c82333;
	}
</style>
