<script>
    import { Search, 
        ButtonSet, 
        InlineNotification,
        Button,
        ProgressBar,

		RadioButtonGroup,

		RadioButton


     } from "carbon-components-svelte";
	import { always, update } from "ramda";
    let searchTerm = "";
    let lastKey=""
    let pageStatus = "fresh";
    let progressBarHidden = true;
    let searchDisabled = false;
    let clubResults = [];
    let platform="common-gen5"
    let searchError = "";



    // @ts-ignore
    const parseSearchResults = results => {
        updatePageStatus("loaded");
        clubResults = results;
        console.log(results)
    }

    const makeResultRow = clubData => `
        <div class="club-search-item-row">
            <div class="club-search-cell club-search-item-name">
                ${clubData.clubName}
            </div>
            <div class="club-search-cell club-search-item-record">
                ${clubData.record}
            </div>
        </div> 
        `;

    const updatePageStatus = (/** @type {string} */ status)  => {
        switch(status) { 
            case "fresh":
                progressBarHidden = true;
                searchDisabled = false;
                searchError = "";
                break;
            case "loading":
                progressBarHidden = false;
                searchDisabled = true;
                searchError = "";
                break;
            case "loaded":
                progressBarHidden = true;
                searchDisabled = false;
                break;
            case "error":
                progressBarHidden = true;
                searchDisabled = false;
                break;
            default: 
        }
        pageStatus = status;
    }

    const executeSearch = () => {

        if(searchTerm.length < 3) {
            searchError = "Club name must be at least 3 characters."
            return; 
        }
        updatePageStatus("loading");

        fetch("https://us-central1-eashl-db46.cloudfunctions.net/eashl-search-fun",{
            method: "POST",
            body: JSON.stringify({
                searchTerm,
                platform: platform
            })
        })
          .then(x => x.json())
          .then(parseSearchResults)
          .catch(e => {
            console.log(e)
            updatePageStatus("error");
          })
    }
    let innerWidth =0;
    let innerHeight = 0;

</script>
<svelte:window bind:innerWidth bind:innerHeight />

<h2>Search</h2>
<Search disabled={searchDisabled} placeholder="Search by Club Name. . ." on:keydown={x => x.code === "Enter" ? executeSearch() : always(1)} bind:value={searchTerm}/>
{#if searchError != ""}
<InlineNotification
    title="Error:"
    subtitle={searchError}
/>
{/if}
{#if !progressBarHidden}
<div> 
    &nbsp;
    <ProgressBar  helperText="Loading . . ." />
</div>
{/if}
<div style="margin-top: 12px;">
    <RadioButtonGroup
        legendText="Platform"
        name="platform"
        bind:selected={platform}
    >
        <RadioButton labelText="Current Gen" value="common-gen5" />
        <RadioButton labelText="Previous Gen" value="common-gen4" />
    </RadioButtonGroup>

</div>
<div style="margin-top: 24px; margin-bottom: 24px;">
    <ButtonSet stacked={innerWidth<640}>
      <Button
        size="small"
        disabled={searchDisabled}
        on:click={executeSearch}
      >
        Search
      </Button>
      <Button
        kind="ghost"
        size="small"
        disabled={searchTerm.length === 0}
        on:click={() => {searchTerm= ""; updatePageStatus("fresh") }}
      >
        Clear Search
      </Button>
    </ButtonSet>
  </div>

{#if pageStatus === "fresh"}
  <div>
    Search for a club . . .
  </div>
{:else if pageStatus === "error"}
   <div> 
     Error 
   </div>
{:else if pageStatus === "loaded"}
   {#if clubResults.length == 0} 
        <div>
            No Clubs Found
        </div>
   {:else}
        <div class="club-search-item-list">
            {#each clubResults as club}
                {@html makeResultRow(club)}
            {/each}
        </div>
   {/if}
{:else if pageStatus === "loading"}
   <div>
      &nbsp;
   </div>
{/if}


  <style>
    .club-search-item-list {
        background-color: #efefee;
        margin: 18px 18px 18px 18px;
        padding: 18px;
        width: 96%;
        display: table;
        /* table-layout: fixed; */
        border-spacing: 0 10px;
    }
    :global(.club-search-item-row) {
        display: table-row;
        width: 100%;
        background-color: rgb(245, 245, 245);
        padding: 8px;
    }
    :global(.club-search-item-row:hover) {
        background-color: #dddddd;
        cursor: pointer;
    }
    :global(.club-search-cell) {
        display: table-cell;
        padding: 8px;
        text-align: center;

    }
    :global(.club-search-item-name) {
        font-weight: bolder;
        /* border: 1px solid green; */
    }
    :global(.club-search-item-record) {
        font-weight: normal;
        /* border: solid 1px yellow; */
    }
  </style>