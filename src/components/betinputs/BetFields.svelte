<script>
    import { createEventDispatcher } from 'svelte';
    import {keys, path} from "ramda"
    export let formData;


  const dispatch = createEventDispatcher();

    function changeBetType(e) {
        console.log("e")
        console.log(e)
        console.log("e")
        dispatch('betTypeChange', formData);
    }
</script>
{#each keys(formData) as key}
    <div class="form-group">
        <label class="form-label" for={key}>{key}</label>
        {#if path([key,"inputType"],formData) == "text"}
            <input id={key} class="form-input" type="text" bind:value={formData[key].value}/> 
        {:else if path([key,"inputType"],formData) == "date"} 
            <input id={key} class="form-input" type="date" bind:value={formData[key].value}/>

        {:else if path([key,"inputType"],formData) == "select"}
            <select id={key} class="form-input" bind:value={formData[key].value} on:change={(e) => changeBetType(e)} >
                <option value="">--Please choose an option--</option>
                {#each path([key,"options"],formData) as opt}
                    <option value={opt}>{opt}</option>
                {/each}
            </select>
        {:else}
            ERROR INPUT TYPE
        {/if}
    </div>
{/each}