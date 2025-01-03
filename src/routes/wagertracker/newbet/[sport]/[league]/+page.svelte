<script>
	import { Button } from "carbon-components-svelte";
	import {page} from '$app/stores'
	import BetInput from "../../../../../components/BetInput.svelte";
	import {authState} from '../../../../../store/user.js';
	import { split, toLower } from "ramda";

	let user = null;


	authState.subscribe(e => {
      user = e.user;

    //   if(e.user)
    //     loadWagers(e.uid)
    })

	const path = $page.url.pathname;
	const pathParts = split("/")(path);
	const sport = toLower(pathParts[3])
	const league = toLower(pathParts[4])
	// const { sport } = data.sport; // Access the 'param' value from URL
	// const { league } = data.league; // Access the 'param' value from URL
</script>
<div>
	<p>
		<a href="/wagertracker">My Wager Tracker Home</a>
	</p>
</div>
<div style="margin-top: 8px;">
	{#if sport == "football"}
		<BetInput {sport} {league} {user}/>
	{:else if sport == "hockey"}
	  <BetInputHockey />
	{:else}
		Sport Not Found
	{/if}
</div>
