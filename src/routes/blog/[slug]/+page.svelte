<script>
	export let data;
	const { title, date, content } = data;
	import { collection, doc, db, getDoc, getDocs, query } from "../../../firebase.js";
	import { endAt, getCountFromServer, limit, orderBy } from "firebase/firestore";
    import { compile } from 'mdsvex';
	import { assoc, map, zipWith } from "ramda";
	import { onMount } from "svelte";

    let md = '_this_ is **easy** to `use`.';
    let documentSnapshots = null;
    let posts = [];


    onMount(async () => {

        const loadClubDbInfo = async () => {
            const blogColletion = collection(db,`/blog`)
            const q = await query(blogColletion, orderBy("datePublished"), limit(5));
            documentSnapshots = await getDocs(q);
            posts = [];
            documentSnapshots.forEach(x => posts.push(x.data()))
            
        }

        loadClubDbInfo();
    })


    const style = "<style> b { font-weight: bolder; }</style>"
</script>

{@html style}
{#each posts as post}
<article>
    <h1>{post.title}</h1>
    {post.datePublished.toDate().toLocaleString()}
    
    <p>{@html post.content}</p>

</article>
{/each}
<style>
    b {
        color: red;
    }
</style>