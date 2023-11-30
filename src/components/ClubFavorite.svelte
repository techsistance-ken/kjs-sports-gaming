<script>

	import { Button } from "carbon-components-svelte";
	import Star from "carbon-icons-svelte/lib/Star.svelte";
	import StarFilled from "carbon-icons-svelte/lib/StarFilled.svelte";
    import {favorites} from '../store/favoriteclubs.js';
	import { findIndex, prop, propEq, find } from "ramda";
    /**
	 * @type {string}
	 */
    export let clubId;
    /**
	 * @type {string}
	 */
    export let clubName;
    /**
	 * @type {string}
	 */
    export let platform;

</script>
<div>


{#if findIndex(x => x.clubId === clubId)($favorites) >= 0}
    <Button kind="ghost"  on:click={() => favorites.toggle(clubId,clubName,platform)}>
        <StarFilled fill="gold" />
        </Button>
{:else}
    <Button style="color: black;" kind="ghost"  on:click={() => favorites.toggle(clubId,clubName,platform)}>
        <Star />
    </Button>
{/if}
</div>


<style>
    svg {
        color: gold;
    }
</style>