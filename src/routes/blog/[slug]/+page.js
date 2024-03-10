// src/routes/blog/[slug]/+page.js
export async function load({ params }) {
    const loadClubDbInfo = async () => {
        const blogColletion = collection(db,`/blog`)
        const q = await query(blogColletion, orderBy("datePublished"), limit(5));
        documentSnapshots = await getDocs(q);
        posts = [];
        documentSnapshots.forEach(x => posts.push(x.data()))


        
    }

    loadClubDbInfo();

	return {
		content,
		title,
		date
	};
}