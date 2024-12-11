import { readable } from "svelte/store";

// Create a readable store with a static list of NFL teams
export const NFLTeams = readable([], (set) => {
    // Static data for now
    const teams = [
        { name: "Arizona Cardinals", city: "Arizona", teamName: "Cardinals", abbreviation: "ARI" },
        { name: "Atlanta Falcons", city: "Atlanta", teamName: "Falcons", abbreviation: "ATL" },
        { name: "Baltimore Ravens", city: "Baltimore", teamName: "Ravens", abbreviation: "BAL" },
        { name: "Buffalo Bills", city: "Buffalo", teamName: "Bills", abbreviation: "BUF" },
        { name: "Carolina Panthers", city: "Carolina", teamName: "Panthers", abbreviation: "CAR" },
        { name: "Chicago Bears", city: "Chicago", teamName: "Bears", abbreviation: "CHI" },
        { name: "Cincinnati Bengals", city: "Cincinnati", teamName: "Bengals", abbreviation: "CIN" },
        { name: "Cleveland Browns", city: "Cleveland", teamName: "Browns", abbreviation: "CLE" },
        { name: "Dallas Cowboys", city: "Dallas", teamName: "Cowboys", abbreviation: "DAL" },
        { name: "Denver Broncos", city: "Denver", teamName: "Broncos", abbreviation: "DEN" },
        { name: "Detroit Lions", city: "Detroit", teamName: "Lions", abbreviation: "DET" },
        { name: "Green Bay Packers", city: "Green Bay", teamName: "Packers", abbreviation: "GB" },
        { name: "Houston Texans", city: "Houston", teamName: "Texans", abbreviation: "HOU" },
        { name: "Indianapolis Colts", city: "Indianapolis", teamName: "Colts", abbreviation: "IND" },
        { name: "Jacksonville Jaguars", city: "Jacksonville", teamName: "Jaguars", abbreviation: "JAX" },
        { name: "Kansas City Chiefs", city: "Kansas City", teamName: "Chiefs", abbreviation: "KC" },
        { name: "Las Vegas Raiders", city: "Las Vegas", teamName: "Raiders", abbreviation: "LV" },
        { name: "Los Angeles Chargers", city: "Los Angeles", teamName: "Chargers", abbreviation: "LAC" },
        { name: "Los Angeles Rams", city: "Los Angeles", teamName: "Rams", abbreviation: "LAR" },
        { name: "Miami Dolphins", city: "Miami", teamName: "Dolphins", abbreviation: "MIA" },
        { name: "Minnesota Vikings", city: "Minnesota", teamName: "Vikings", abbreviation: "MIN" },
        { name: "New England Patriots", city: "New England", teamName: "Patriots", abbreviation: "NE" },
        { name: "New Orleans Saints", city: "New Orleans", teamName: "Saints", abbreviation: "NO" },
        { name: "New York Giants", city: "New York", teamName: "Giants", abbreviation: "NYG" },
        { name: "New York Jets", city: "New York", teamName: "Jets", abbreviation: "NYJ" },
        { name: "Philadelphia Eagles", city: "Philadelphia", teamName: "Eagles", abbreviation: "PHI" },
        { name: "Pittsburgh Steelers", city: "Pittsburgh", teamName: "Steelers", abbreviation: "PIT" },
        { name: "San Francisco 49ers", city: "San Francisco", teamName: "49ers", abbreviation: "SF" },
        { name: "Seattle Seahawks", city: "Seattle", teamName: "Seahawks", abbreviation: "SEA" },
        { name: "Tampa Bay Buccaneers", city: "Tampa Bay", teamName: "Buccaneers", abbreviation: "TB" },
        { name: "Tennessee Titans", city: "Tennessee", teamName: "Titans", abbreviation: "TEN" },
        { name: "Washington Commanders", city: "Washington", teamName: "Commanders", abbreviation: "WAS" },
    ];

    // Set the initial value of the store
    set(teams);

    // Return a cleanup function (not needed here, as there's no active subscription)
    return () => {};
});
