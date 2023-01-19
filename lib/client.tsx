import  SanityClient  from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
projectId:"prma4fxg",
dataset:"production",
apiVersion:"2023-01-14",
useCdn:true,
token:process.env.SANITY_TOKEN
});

const builder :any =ImageUrlBuilder(client)

export const urlFor=(source:any)=>builder.image(source)
