import * as R from 'ramda';
import betTrackerData from './wager.json' assert { type: 'json' };

const groupByParam = "type";

// Formatter for USD currency with two decimal places
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

// Group by bet type (case-insensitive), count results, sum totalNet, and calculate winning percentage
const groupAndSummarize = (data) => {
  // Group bets by type (convert type to lowercase for case-insensitivity)
  const groupedByType = R.groupBy(
    (bet) => R.path(['bet', groupByParam], bet)?.toLowerCase() || 'unknown',
    data
  );

  // Process each group and calculate statistics
  const summarizedData = R.map((bets) => {
    // Count WIN, LOSS, PUSH
    const results = R.countBy(R.path(['wager', 'result']), bets);

    // Sum totalNet for the group
    const totalNet = R.sum(bets.map((bet) => bet.wager.totalNet || 0));

    // Calculate Winning Percentage (exclude PUSH)
    const winCount = results.WIN || 0;
    const lossCount = results.LOSS || 0;
    const totalGames = winCount + lossCount; // Exclude PUSH from the total count
    const winningPercentage = totalGames > 0 ? (winCount / totalGames) * 100 : 0;

    return {
      TYPE: R.prop(groupByParam)(bets[0].bet),
      WIN: results.WIN || 0,
      LOSS: results.LOSS || 0,
      PUSH: results.PUSH || 0,
      totalNet: currencyFormatter.format(totalNet), // Format as currency
      winningPercentage: winningPercentage.toFixed(2), // Rounded to two decimals
    };
  })(groupedByType);

  // Sort by winning percentage in descending order
  const sortedData = R.sortBy(R.prop('winningPercentage'), R.reverse(R.values(summarizedData)));

  return sortedData;
};

const result = groupAndSummarize(betTrackerData);

console.log(result);
// Example Output:
// [
//   { type: 'player prop', WIN: 1, LOSS: 2, PUSH: 0, totalNet: "$20.00", winningPercentage: "33.33" },
//   { type: 'team prop', WIN: 0, LOSS: 1, PUSH: 1, totalNet: "-$5.00", winningPercentage: "0.00" }
// ]
