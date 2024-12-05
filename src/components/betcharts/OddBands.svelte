<script>
    import { onMount, afterUpdate } from "svelte";

    export let wagers = []; // Input parameter
    let chartType = 'byTotalNet'; // Default chart type

    // Define the bands
    const bands = [
        { label: "-100 to -115", min: -115, max: -100 },
        { label: "-116 to -130", min: -130, max: -116 },
        { label: "-131 to -199", min: -199, max: -131 },
        { label: "-200 or -299", min: -299, max: -200 },
        { label: "-300 or -499", min: -499, max: -300 },
        { label: "-500 or less", min: Number.NEGATIVE_INFINITY, max: -500 },
        { label: "+100 to +115", min: 100, max: 115 },
        { label: "+116 to +130", min: 116, max: 130 },
        { label: "+131 to +199", min: 131, max: 199 },
        { label: "+200 to +299", min: 200, max: 299 },
        { label: "+300 to +499", min: 300, max: 499 },
        { label: "+500 or more", min: 500, max: Number.POSITIVE_INFINITY },
    ];

    let groupedData = [];
    let chartReady = false; // Flag to indicate when Google Charts is ready

    // Group data into bands and calculate the necessary data
    const processData = () => {
        groupedData = bands.map((band) => {
            const bandWagers = wagers.filter(
                (wager) => wager.totalOdds >= band.min && wager.totalOdds <= band.max
            );

            if (chartType === 'byWinLoss') {
                const wins = bandWagers.filter((wager) => wager.result === "WIN").length;
                const losses = bandWagers.filter((wager) => wager.result === "LOSS").length;
                return { label: band.label, wins, losses };
            } else if (chartType === 'byTotalNet') {
                // Calculate total net for the band
                const totalNet = bandWagers.reduce((sum, wager) => sum + wager.totalNet, 0);
                return { label: band.label, totalNet };
            }
        });
    };

    // Function to load Google Charts script dynamically
    const loadGoogleCharts = async () => {
        return new Promise((resolve, reject) => {
            if (window.google && google.charts) {
                chartReady = true;
                resolve(); // Google Charts already loaded
            } else {
                const script = document.createElement("script");
                script.src = "https://www.gstatic.com/charts/loader.js";
                script.onload = () => {
                    google.charts.load("current", { packages: ["corechart", "bar"] });
                    google.charts.setOnLoadCallback(() => {
                        chartReady = true;
                        resolve();
                    });
                };
                script.onerror = () => reject(new Error("Google Charts failed to load."));
                document.head.appendChild(script);
            }
        });
    };

    // Draw the chart based on the chartType
    const drawChart = () => {
        if (!chartReady) return;

        const data = new google.visualization.DataTable();
        data.addColumn("string", "Odds Band");

        if (chartType === 'byWinLoss') {
            data.addColumn("number", "Wins");
            data.addColumn("number", "Losses");

            groupedData.forEach((band) => {
                data.addRow([band.label, band.wins, band.losses]);
            });
        } else if (chartType === 'byTotalNet') {
            data.addColumn("number", "Total Net");
            groupedData.forEach((band) => {
                data.addRow([band.label, band.totalNet]);
            });
        }

        const options = {
            title: chartType === 'byWinLoss' ? "Wins and Losses by Odds Band" : "Total Net by Odds Band",
            hAxis: { title: "Odds Band" },
            vAxis: { 
                title: chartType === 'byWinLoss' ? "Count" : "Total Net",
                format: chartType === 'byTotalNet' ? "currency" : undefined,
                currency: chartType === 'byTotalNet' ? "USD" : undefined,
            },
            isStacked: chartType === 'byWinLoss', // Enable stacked bars only for Win/Loss chart
            series: {
                0: { color: chartType === 'byWinLoss' ? "green" : (row) => (row[1] > 0 ? "green" : "red") },
                1: { color: "red" },
            },
            legend: { position: "top" },
        };

        const chart = new google.visualization.BarChart(document.getElementById("chart_div"));
        chart.draw(data, options);
    };

    // Wait for Google Charts to load, then process and draw the chart
    onMount(async () => {
        await loadGoogleCharts(); // Ensure Google Charts is loaded
        processData(); // Process wager data
        drawChart(); // Initial drawing
    });

    // Ensure chart is drawn after DOM update
    afterUpdate(() => {
        if (chartReady && wagers.length && groupedData.length) {
            processData(); // Reprocess data if wagers change
            drawChart(); // Redraw the chart
        }
    });

    // Toggle chart type
    const toggleChartType = () => {
        chartType = chartType === 'byTotalNet' ? 'byWinLoss' : 'byTotalNet';
        processData(); // Reprocess data with the new chart type
        drawChart(); // Redraw the chart with the new chart type
    };
</script>

<style>
    #chart_div {
        width: 100%;
        height: 500px;
    }
    .toggle-button {
        margin: 10px 0;
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 16px;
    }
    .toggle-button:hover {
        background-color: #45a049;
    }
</style>

<div>
    <!-- Toggle button to switch between chart types -->
    <button class="toggle-button" on:click={toggleChartType}>
        {chartType === 'byTotalNet' ? 'Show Win/Loss' : 'Show Total Net'}
    </button>
    <div id="chart_div"></div>
</div>
