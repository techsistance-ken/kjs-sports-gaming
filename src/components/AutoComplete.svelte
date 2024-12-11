<script>
    import { createEventDispatcher } from 'svelte';
  
    export let items = []; // List of suggestions
    let query = '';
    let suggestions = [];
    let showSuggestions = false;
  
    const dispatch = createEventDispatcher();
  
    // Update suggestions based on the query
    function updateSuggestions() {
      suggestions = items.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      showSuggestions = suggestions.length > 0;
    }
  
    // Handle selection of an item
    function selectItem(item) {
      query = item;
      showSuggestions = false;
      console.log("AA",item)
      dispatch('select', { item });
    }
  
    // Handle blur event to enforce a selection
    function handleBlur() {
        setTimeout(() => {
      if (!hasSelected && !items.includes(query)) {
        query = ''; // Reset input if no valid selection
      }
      showSuggestions = false;
    }, 150); // Short delay to allow click events to register
    }
  </script>
  
  <style>
    .autocomplete {
      position: relative;
      width: 300px;
    }
  
    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
  
    ul {
      position: absolute;
      width: 100%;
      list-style: none;
      background: white;
      border: 1px solid #ccc;
      margin: 0;
      padding: 0;
      z-index: 1000;
    }
  
    li {
      padding: 8px;
      cursor: pointer;
    }
  
    li:hover {
      background: #f0f0f0;
    }
  </style>
  
  <div class="autocomplete">
    <input
      type="text"
      bind:value={query}
      on:input={updateSuggestions}
      on:blur={handleBlur}
      placeholder="Start typing..."
    />
    {#if showSuggestions}
      <ul>
        {#each suggestions as suggestion}
          <li on:click={() => {selectItem(suggestion); }}>{suggestion}</li>
        {/each}
      </ul>
    {/if}

  </div>
  