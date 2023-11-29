import { error } from '@sveltejs/kit';
import { assoc, prop } from "ramda"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
 
    const platform = params.platform;
    const clubId = params.clubId;

    let data = {status: "error"};

    try {

        const response = await fetch("https://eashl-ohxio2uirq-uc.a.run.app/club",{
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            type: "by-id",
            platform,
            clubId
        })
   }) 

   data = await response.json();


   // @ts-ignore
   data = prop("success",data[0]) ? assoc("status","loaded")(data) : assoc("status","error")(data);

   

   }
   catch(e) {
     console.log(`Error ${e}`)

   }

  return {
    data,
    platform,
    clubId
  };
}