<script>

	import { Button, Modal } from "carbon-components-svelte";
	import Trophy from "carbon-icons-svelte/lib/Trophy.svelte";
	import TrophyFilled from "carbon-icons-svelte/lib/TrophyFilled.svelte";
	import Star from "carbon-icons-svelte/lib/Star.svelte";
	import StarFilled from "carbon-icons-svelte/lib/StarFilled.svelte";
    import {favorites} from '../store/favoriteclubs.js';
    import {myclub} from '../store/myclub.js';
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
    let open=false;

</script>


<div style="display: flex; flex-direction: row;">
    <div style="padding: 4px; margin-right: 4px;  display: flex; flex-direction: column;">
        Favorite
        <Button size="small" kind="ghost"  on:click={() => favorites.toggle(clubId,clubName,platform)}>
            {#if findIndex(x => x.clubId === clubId)($favorites) >= 0}
                <StarFilled fill="gold" />
            {:else}
                <Star />
            {/if}
        </Button>
    </div>
    <div style="padding: 4px; margin-left: 4px; display: flex; flex-direction: column;">
        My Club
        <Button size="small" kind="ghost"  on:click={() => {
            console.log(`MyClub ${JSON.stringify($myclub)}`)
            if($myclub == null)
                myclub.toggle(clubId,clubName,platform)
            else {
                if($myclub.clubId === clubId)
                    myclub.toggle(clubId,clubName,platform)
                else
                    open = true;
            }
        }}>
            {#if $myclub != null && $myclub.clubId == clubId}
                <TrophyFilled fill="gold" />
            {:else}
                <Trophy />
            {/if}
        </Button>
    </div>
</div>


<Modal
  size="xs"

  danger
  bind:open
  modalHeading="Replace Existing Club"
  primaryButtonText="Replace"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (open = false)}
  on:click:button--primary={() => {console.log("HEEELO"); open=false; myclub.toggle(clubId,clubName,platform)}}
  on:open
  on:close
  on:submit
>
  {#if $myclub}
    <p>Current Club is {$myclub.clubName}.  Do you want to replace it?</p>
  {:else}
    <p>No Club</p>
   {/if}
</Modal>

<style>
    svg {
        color: gold;
    }
</style>