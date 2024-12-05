<script>
    import { onMount } from 'svelte';
    import { fetchWagers, db } from '../../firebase.js'; // Import the fetch function from firebase.js
    import { getDoc, doc } from 'firebase/firestore'; // Import Firestore methods for getting a document
    import { Tile } from 'carbon-components-svelte';
	import BetInput from '../../components/BetInput.svelte';
	import OddBands from '../../components/betcharts/OddBands.svelte';
	import OddBandsNet from '../../components/betcharts/OddBandsNet.svelte';
 
    let wagers = [];         // List of wagers to display
    let loading = false;     // To show loading state
    let totalWagers = 0;     // Total count of wagers
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
      loading = true;
      const { wagers: newWagers, totalWagers: total } = await fetchWagers();
  
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
      loading = false;
    };
  
    // Load all wagers on mount
    onMount(() => {
      loadWagers();
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
  </style>

  <!-- <BetInput /> -->
  
  <div class="wager-list">
    {#if loading}
      <div class="loading">Loading...</div>
    {:else}
        <!-- <OddBands wagers={wagers} /> -->
        <OddBands chartType="byTotalNet" wagers={wagers} />
      <h2>Total Wagers: {totalWagers}</h2>
      {#each wagers as wager}
        <div class="card">
            <div class="date">{formatDate(new Date(wager.wagerDate))}</div>
            <div class="description">{wager.bet.description} ({wager.totalOdds})</div>
            <div class="card-content">
                <span>{formatCurrency(wager.risk)}</span>
                <span>{wager.result}</span>
                <span class={`net-value ${getNetColor(wager.totalNet)}`}>{wager.totalNet >= 0 ? `+${formatCurrency(wager.totalNet)}` : formatCurrency(wager.totalNet)}</span>
            </div>
        </div>
      {/each}
    {/if}
  </div>
  