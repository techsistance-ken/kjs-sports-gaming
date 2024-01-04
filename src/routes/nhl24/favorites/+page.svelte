<script>
    import {favorites} from '../../../store/favoriteclubs.js';
</script>

<h2>Favorites</h2>
{#each $favorites as favorite} 

{favorite.clubName}

{/each}