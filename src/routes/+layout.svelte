<script>
    import {     SideNav,SideNavLink,SideNavDivider,
    SideNavItems,
    SideNavMenu,
    HeaderGlobalAction,HeaderUtilities,
    SideNavMenuItem,Content, Header, SkipToContent, HeaderNav, HeaderNavItem, HeaderNavMenu } from 'carbon-components-svelte';
    import "carbon-components-svelte/css/white.css";
    import { signOut } from 'firebase/auth';
    import { auth } from '../firebase';
    import { myclub } from '../store/myclub.js';
    import {authState} from '../store/user.js';
    import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';  
    let pageName = $page.url.pathname  
    let theme = "white"; // "white" | "g10" | "g80" | "g90" | "g100"

    
    async function logOut() {
        await signOut(auth);
        await goto('/');
    }

    let isSideNavOpen = false;
    let innerWidth = 0
    let innerHeight = 0

</script>
<svelte:window bind:innerWidth bind:innerHeight />

{#if pageName != "/irlmlb24/mlbingo"}
  <Header company="KJs"   persistentHamburgerMenu={true} platformName="Sports+Gaming" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
    <HeaderUtilities>
      {#if $authState.isLoggedIn}
        <HeaderGlobalAction on:click={() => goto("/login")} icon={UserAvatarFilledAlt} />
      {/if}
    </HeaderUtilities>
  </Header>
  <SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
      <SideNavLink on:click={() => !$authState.isLoggedIn ? authState.login() : authState.logout()} text={$authState.isLoggedIn ? "Log Out" : "Log In With Google"} />
      <SideNavDivider />
      <SideNavMenu text="IRL MLB24">
        <SideNavMenuItem href="/irlmlb24/mlbingo" text="MLBINGO Home" />
      </SideNavMenu>
      <SideNavMenu text="EA NHL24">
        <SideNavMenuItem href="/nhl24" text="EA NHL24 Home" />
        <SideNavMenuItem href="/nhl24/search" text="Search For Clubs" />
        {#if $myclub != null}
          <SideNavMenuItem href="/nhl24/clubs/{$myclub.platform}/{$myclub.clubId}" text={$myclub.clubName} />
        {/if}
        <SideNavMenuItem href="/nhl24/favorites" text="Favorite Clubs" />
        <!-- <SideNavMenu text="CLUBS">
          <SideNavMenuItem href="/nhl24/clubs/ps5/1620" text="Respect the Indian" />
        </SideNavMenu>
        <SideNavMenu text="PLAYERS">
          <SideNavMenuItem href="/nhl24/player-stats/ps5/kjdadada" text="kjdadada" />
          <SideNavMenuItem href="/nhl24/player-stats/ps5/ritti34" text="ritti34" />
          <SideNavMenuItem href="/nhl24/player-stats/ps5/pj26pj" text="pj26pj" />
        </SideNavMenu> -->
      </SideNavMenu>
    </SideNavItems>
  </SideNav>
{/if}

<Content>
  <slot></slot>
</Content>
<!-- <footer>
  {innerHeight} {innerWidth}
</footer> -->
<style>
    nav {
        display: flex;
        justify-content: end;
        padding: 1.3em 2em;
        background-color: whitesmoke;
        box-shadow: 0 6px 8px #D7E1E9;
    }
    nav h2 {
        font-weight: bold;
        font-size: 18px;
        color: black;
    }
    nav ul li {
        list-style: none;
        display: inline-block;
        padding-right: 1em;
    }
    li a  {
        text-decoration: none;
        color: black;
    }
    li a:hover {
        color: orange;
    }
    footer {
        background-color: #D7E1E9;
        padding: 2em;
        height: 10vh;
        display: flex;
        justify-content: center;
    }
</style>