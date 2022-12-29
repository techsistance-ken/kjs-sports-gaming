<script>
    import {     SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,Content, Header, SkipToContent, HeaderNav, HeaderNavItem, HeaderNavMenu } from 'carbon-components-svelte';
    import "carbon-components-svelte/css/white.css";
    import { signOut } from 'firebase/auth';
    import { auth } from '../firebase';
    import { goto } from '$app/navigation';


    async function logOut() {
        await signOut(auth);
        await goto('/');
    }

    let isSideNavOpen = false;

</script>

<Header company="KJS"   persistentHamburgerMenu={true} platformName="Sports Gaming" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
</Header>
<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavMenu text="NHL23">
      <SideNavMenu text="CLUBS">
        <SideNavMenuItem href="/nhl23/clubs/ps5/13156" text="AFC Richmond (PS5)" />
      </SideNavMenu>
      <SideNavMenu text="PLAYERS">
        <SideNavMenuItem href="/nhl23/player-stats/ps5/kjdadada" text="kjdadada" />
        <SideNavMenuItem href="/nhl23/player-stats/ps5/ritti34" text="ritti34" />
      </SideNavMenu>
    </SideNavMenu>
  </SideNavItems>
</SideNav>


<Content>
  <slot></slot>
</Content>
<footer>
</footer>
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