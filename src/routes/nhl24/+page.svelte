<script>
	import { goto }      from "$app/navigation";
      import Search from "carbon-icons-svelte/lib/Search.svelte";
      import ToolBox from "carbon-icons-svelte/lib/ToolBox.svelte";
      import DataEnrichment from "carbon-icons-svelte/lib/DataEnrichment.svelte";

      const gotoSearch = () => {
        goto(`/nhl24/search`, { replaceState: false}) 
      }

</script>
<h2>NHL 24</h2>
<p>Welcome to KJ's NHL 24 Tools and Community.</p>
<div class="app-card-container">
    <div class="app-card"
        on:keydown={gotoSearch} 
        on:click={gotoSearch} 
    >
        <div class="app-card-icon">
            <Search size={32} />
        </div>
        Search Clubs
    </div>
    <div class="app-card"
        on:keydown={gotoSearch} 
        on:click={gotoSearch} 
    >
        <div class="app-card-icon">
            <ToolBox size={32} />
        </div>
        Explore Builds 
    </div>
    <div class="app-card"
        on:keydown={gotoSearch} 
        on:click={gotoSearch} 
    >
        <div class="app-card-icon">
            <DataEnrichment size={32} />
        </div>
        Tips & Tricks
    </div>
</div>

<style>
    .app-card-container {
        display: inline-flex;
    }
    .app-card:hover {
        background-color: #f3ead4;
        cursor: pointer;
    }
    .app-card {
        align-items: center;
        justify-content: center;
        display: flex;
        margin-right: 12px;
        margin-left: 12px;
        flex-direction: column;
        background-color: #D4F3E1;
        padding: 24px;
        border: solid 1px gray;
        border-radius: 8px;
    }
    .app-card-icon {
        margin-bottom: 12px;
    }
</style>