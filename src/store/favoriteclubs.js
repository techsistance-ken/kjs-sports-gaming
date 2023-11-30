import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { compose, equals, findIndex, prepend, propEq, remove, uniq } from "ramda";

const localStorageKey = "favorites3"
function createFavorites() {
	const { subscribe, set, update } = writable([]);
    const loadFromLocalStorage = () => {
        if(!browser) return [];

        const c = localStorage.getItem(localStorageKey);
        
        return c ? JSON.parse(c) : [];
    }

    set(loadFromLocalStorage());

	return {
		subscribe,
		toggle: (clubId,clubName,platform) => update((cur) => {

            console.log(cur);
            console.log(clubId)
            const ndx = findIndex(x => x.clubId === clubId)(cur);
            console.log(`NDX: ${ndx}`)

            const c = ndx >= 0 ? remove(ndx, 1)(cur) : prepend({platform,clubId,clubName})(cur);
            if(browser) localStorage.setItem(localStorageKey,JSON.stringify(c));
            return c;
        }),
	};
}

export const favorites = createFavorites();


