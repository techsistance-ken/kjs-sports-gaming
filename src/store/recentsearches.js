import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { compose, prepend, remove, uniq } from "ramda";

function createSearches() {
	const { subscribe, set, update } = writable([]);
    const loadFromLocalStorage = () => {
        if(!browser) return [];

        const c = localStorage.getItem("searches");
        
        return c ? JSON.parse(c) : [];
    }

    set(loadFromLocalStorage());

	return {
		subscribe,
		newSearch: (/** @type {String} */ newTerm) => update((cur) => {
            const newArr = prepend(newTerm,cur)
            // always max the recent searches to 20
            const c = compose(
                remove(20,1000),
                a => uniq(a)
            )(newArr);
            if(browser) localStorage.setItem("searches",JSON.stringify(c));
            return c;
        }),
		clearSearches: () => set([])
	};


}

export const searches = createSearches();


