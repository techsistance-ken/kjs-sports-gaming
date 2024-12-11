<script>
    import { createEventDispatcher } from 'svelte';
  
    export let items = []; // Initial list of items
    export let selectedValue = ''; // Pre-selected value
  
    const dispatch = createEventDispatcher();
    let newItem = ''; // To store the new item being added
  
    // Handle selection from dropdown
    function handleSelect(event) {
      const value = event.target.value;
      selectedValue = value;
      dispatch('select', { value });
    }
  
    // Add a new item to the list
    function addItem() {
      if (newItem.trim() && !items.includes(newItem)) {
        items = [...items, newItem]; // Update the list dynamically
        selectedValue = newItem; // Automatically select the new item
        dispatch('add', { item: newItem }); // Emit an event for the new item
        newItem = ''; // Reset the input field
      }
    }
  </script>
  
  <style>
    .dropdown-with-add {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  
    select,
    input {
      padding: 8px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button {
      padding: 8px 16px;
      font-size: 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>
  
  <div class="dropdown-with-add">
    <select bind:value={selectedValue} on:change={handleSelect}>
      <option value="" disabled>Select or add an option</option>
      {#each items as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
  
    <div>
      <input
        type="text"
        placeholder="Add new item..."
        bind:value={newItem}
      />
      <button on:click={addItem} disabled={!newItem.trim()}>Add</button>
    </div>
  </div>
  