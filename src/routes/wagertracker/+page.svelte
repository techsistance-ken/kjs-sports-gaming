<script>
  import { onMount } from 'svelte';
  import { fetchWagers, db, auth, fetchBets } from '../../firebase.js'; // Import the fetch function from firebase.js
  import { getDoc, doc } from 'firebase/firestore'; // Import Firestore methods for getting a document
  import { Button, Tile } from 'carbon-components-svelte';
  import {authState} from '../../store/user.js';
	import BetInput from '../../components/BetInput.svelte';
	import OddBands from '../../components/betcharts/OddBands.svelte';
	import OddBandsNet from '../../components/betcharts/OddBandsNet.svelte';

  import {prop, pluck, countBy, identity, pipe, sum, filter, length, find, propEq, path} from "ramda"
	import { Number_0 } from 'carbon-icons-svelte';
 
    let showChart = false;
    let bets = [];
    let allBets = [];
    let wagers = [];         // List of wagers to display
    let allWagers = [];
    let loading = false;     // To show loading state
    let totalWagers = 0;     // Total count of wagers

    let user = null;



    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    };

    // Determine net text color
    const getNetColor = (net) => {
        if (net > 0) return "text-green";
        if (net < 0) return "text-red";
        return "text-black";
    };
    // Function to fetch all wagers and related bet data
    const loadWagers = async () => {
      if(!$authState.user) {

        loading = false;
        totalWagers = 0;

      }
      loading = true;
      const { wagers: newWagers, totalWagers: total } = await fetchWagers($authState.user.uid);
  
      // Fetch bet data for each wager using the betId
    //   for (let wager of newWagers) {
    //     if (wager.betId) {
    //       const betDoc = await getDoc(doc(db, 'users/kjdadada/wagertracker/1/bet', wager.betId));
    //       if (betDoc.exists()) {
    //         wager.betData = betDoc.data(); // Add bet data to wager
    //       }
    //     }
    //   }
  
      wagers = newWagers;
      wagers = [...wagers].sort(
        (a, b) => new Date(b.wagerDate) - new Date(a.wagerDate)
    );
      totalWagers = total;
      allWagers = wagers;
      loading = false;
    };
  
    // Load all wagers on mount
    onMount(() => {
      // loadWagers();
    });
  
    // Function to format numbers as USD currency with two decimals
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    };


    const calculateTotalNet = (wagers) => {
        // Sum the totalNet values
      const sumTotalNet = pipe(
        pluck('totalNet'), // Extract totalNet values from wagers
        sum                 // Sum up the totalNet values
      );

      let totalNetSum = sumTotalNet(wagers);

      // Format as currency (2 decimals)
      const formatCurrency = (value) => `$${value.toFixed(2)}`;
      let formattedNetSum = formatCurrency(totalNetSum);

      return formattedNetSum;
    }
    const calculateRecord = (wagers) => {
        // Ramda function to count results
        const countResults = pipe(
          pluck('result'),       // Extract the 'result' attribute from each object
          countBy(identity)    // Count occurrences of each unique value
        );

        // Get counts
        let resultCounts = countResults(wagers);

        // Destructure counts for use in the template
        let wins = resultCounts.WIN || 0;
        let losses = resultCounts.LOSS || 0;
        let pushes = resultCounts.PUSH || 0;

        return {txt: `${wins}-${losses}-${pushes}`, win: wins, loss: losses, push: pushes}
    }


    const filterWagersBySubject = (subject) => {
      wagers = filter(x => find(y => y.subject == subject)(x.bets) == null ? false : true)(allWagers) 

      console.log(wagers.length)
    }
    const filterWagersBySport = (sport) => {
      wagers = filter(x => find(y => y.sport == sport)(x.bets) == null ? false : true)(allWagers) 

      console.log(wagers.length)
    }

    authState.subscribe(e => {
      user = e.user;

      if(e.user)
        loadWagers(e.uid)
    })
  </script>
  
  <style>

.card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        margin: 12px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .date {
        color: darkgray;
        font-size: 0.875rem;
        margin-bottom: 8px;
    }

    .description {
        font-weight: bold;
        color: black;
        font-size: 1rem;
        margin-bottom: 8px;
    }

    .card-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
    }

    .net-value {
        font-weight: bold;
    }

    .net-value.green {
        color: green;
    }

    .net-value.red {
        color: red;
    }

    .net-value.black {
        color: black;
    }

    .wager-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin: 1rem 0;
    }
  
    .wager-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
      font-size: 0.9rem;
      height: 40px; /* Adjusted height */
    }
  
    .wager-item > div {
      flex: 1;
      text-align: center;
      padding: 0.5rem;
    }
  
    .loading {
      text-align: center;
      font-size: 1.5rem;
    }
  
    h2 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .green-border {
        border: 2px solid green;
    }

    .red-border {
        border: 2px solid red;
    }
  </style>

  <div>
    Hello {prop("displayName",$authState.user)}
    <p>
      Add New Bet:  <a href="wagertracker/newbet/football/nfl">Football - NFL</a>
    </p>
  </div>
  <!-- <BetInput /> -->
  
  <div class="wager-list">
    {#if loading}
      <div class="loading">Loading...</div>
    {:else}
        <!-- <OddBands wagers={wagers} /> -->
         {#if showChart}
          <OddBands chartType="byTotalNet" wagers={wagers} />
          {/if}
      <h2>Total Wagers: {totalWagers}</h2>
      {#if totalWagers > 0 && wagers} 
       bets: {length(bets)}
      <div>
        <Button on:click={() => filterWagersBySubject("Bears")}>Filter Bears</Button>
        <Button on:click={() => filterWagersBySport("NCAAF")}>Filter NFL</Button>
        <Button on:click={() => wagers = allWagers}>Clear Filter</Button>
        Record: {calculateRecord(wagers).txt}
        Net: {calculateTotalNet(wagers)}
      </div>


      {/if}
      {#each wagers as wager}
            <div
            class="card {wager.result === 'WIN' ? 'green-border' : wager.result === 'LOSS' ? 'red-border' : 'default-border'}"
        >
            <div class="date">{typeof wager.wagerDate == "string" ? formatDate(new Date(wager.wagerDate)) : formatDate(new Date(wager.wagerDate.toDate()))}</div>
            <div class="date">{wager.id}</div>
            <div class="date">{typeof wager.wagerDate}</div>
            <div class="date">{wager.wagerDate}</div>
            <div class="description">{wager.bets[0].description} ({wager.totalOdds})</div>
            <div class="card-content">
                <span>{formatCurrency(wager.risk)}</span>
                <span>{wager.result}</span>
                <span class={`net-value ${getNetColor(wager.totalNet)}`}>{wager.totalNet >= 0 ? `+${formatCurrency(wager.totalNet)}` : formatCurrency(wager.totalNet)}</span>
            </div>
        </div>
      {/each}
    {/if}
  </div>
  