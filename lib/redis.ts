
import Redis from "ioredis";

//Setting up redis client.
const redis = new Redis(process.env.REDIS_NODE_URL);


//Set url function
export async function setUrl(url: string) {
    console.log(" API to create a short url for the given long url:", url);
    const short = getShort();
    await redis.set(`short/${short}`, url);
    return short;
}


// Get long url from short url.
export async function getUrl(short: string): Promise <string>{
  console.log("API to get a long url for the given short url: ", short);
  const data  = await redis.get(`short/${short}`)
  if (data){
    return data;
  }
  return "";
}

//TODO

//Get short url of length 8.
function getShort(): string {
  console.log("API to generate a eight chars code.");
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

  //const fetchedkey = getUrl(shorturl)
  //console.log("fetchedkey: ", fetchedkey);
  
  //Check for dublicate key.
  /*if (getUrl(shorturl) != null){
    console.log(`Already present ${shorturl}. Looping again!`);
    return getShort()
  }*/

  return [... new Array(8)]
  .map(_ => alpha[Math.floor(Math.random() * alpha.length)])
  .join("");
}




