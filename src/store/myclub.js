import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { compose, equals, findIndex, prepend, propEq, remove, uniq } from "ramda";

const localStorageKey = "myclub"
function createMyClub() {
	const { subscribe, set, update } = writable({});
    const loadFromLocalStorage = () => {
        if(!browser) return [];

        const c = localStorage.getItem(localStorageKey);
        
        return c ? JSON.parse(c) : c;
    }

    set(loadFromLocalStorage());

	return {
		subscribe,
		toggle: (clubId,clubName,platform) => update(cur => {

            console.log(`Cur: ${cur}`)

            if(!cur) {
                const myClub = {
                    clubId,
                    clubName,
                    platform
                }

                localStorage.setItem(localStorageKey,JSON.stringify(myClub))
                return myClub;
            }

            if(browser) localStorage.removeItem(localStorageKey);
            return null;

        }),
	};
}

export const myclub = createMyClub();


