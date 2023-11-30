import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { prepend, remove } from "ramda";

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
            const c = remove(5,1000,newArr);
            if(browser) localStorage.setItem("searches",JSON.stringify(c));
            return c;
        }),
		clearSearches: () => set([])
	};


}

export const searches = createSearches();


