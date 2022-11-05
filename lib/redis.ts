import { Redis } from '@upstash/redis';

//API setup to call upstash DB.
const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_TOKEN as string,
})

//Set url function.
export async function setUrl(url: string) {
    console.log(" Function to create a short url for the given long url:", url);
    const short = await getShort();
    await redis.set(`${short}`, url); //Short url is valid for 1 hour.
    return short;
}


// Get a long url from short url code.
export async function getUrl(short: string): Promise <any>{
  console.log("Function to get a long url for the given short url: ", short);
  const data = await redis.get(`${short}`);
  if (data){
    return data;
  }
  return "";
}


//const sleep = (ms) => new Promise(r => setTimeout(r, ms));

//Get short url of length 8.
export async function getShort(): Promise<any>  {
  console.log("Function to generate a eight chars code.");

  //Generate a code.
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
  const code = [... new Array(8)]
  .map(_ => alpha[Math.floor(Math.random() * alpha.length)])
  .join("")

  // Check if the short code is already present.
  const db_value = await getUrl(code) 
  if (db_value){
    console.log(`There is already existing key ${code} with value ${db_value}. Please create a new key.`);
    //await sleep(10000);
    return getShort()
  }

  return code;
}




