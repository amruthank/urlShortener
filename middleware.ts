import { NextRequest, NextResponse } from "next/server";
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.REDIS_URL as string,
    token: process.env.REDIS_TOKEN as string,
  })


// Middleware used here to extract the original url.
export async function middleware(req:NextRequest) {
    console.log("Running middleware..");
    
    const path = req.nextUrl.pathname.split("/")[1];
    
    if (["favicon.ico", "api", "_next", ""].includes(path)){
        return
    }

    // Short url will be redirected to the original url.
    const url: any  = await redis.get(`${path}`) 
    
    if (url){
        return NextResponse.redirect(url);
    }

    // If short url is not found!
    const notfoundUrl = req.nextUrl.clone()
    notfoundUrl.pathname = '/not-found'
    return NextResponse.rewrite(notfoundUrl);
    
}





