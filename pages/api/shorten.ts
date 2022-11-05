// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setUrl } from '../../lib/redis';


// Url regex match.
function validURL(str: string) {
  var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if(res == null)
      return false;
  else
      return true;
}

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  console.log("API to store the details.");
  const url = req.body.url;
  const short = await setUrl(url);

  //Check for url format.
  if (["False", false].includes(validURL(url))){
    console.log("Invalid input url format!");
    return res.status(400).json({ message: 'Invalid url format!' })
  }

    console.log(`Long url is ${url} and short code generated is ${short}`);
    res.status(200).json({ url, short })

}
