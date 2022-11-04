import { NextRequest, NextResponse } from "next/server";
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.REDIS_URL as string,
    token: process.env.REDIS_TOKEN as string,
  })


export async function middleware(req:NextRequest) {
    const path = req.nextUrl.pathname.split("/")[1];
    
    if (["favicon.ico", "api", "_next", ""].includes(path)){
        return
    }

    const url: any  = await redis.get(`short/${path}`) // short url redirect to original url.
    if (url){
        return NextResponse.redirect(url);
    }

    // If short url is not found!
    const notfoundUrl = req.nextUrl.clone()
    notfoundUrl.pathname = '/not-found'
    return NextResponse.rewrite(notfoundUrl);
    
}





