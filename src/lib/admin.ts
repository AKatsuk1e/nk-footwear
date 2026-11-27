import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
export function authorized(req:NextRequest){
 const raw=req.cookies.get("nk_admin_session")?.value||"", parts=raw.split(".");
 if(parts.length!==2||!process.env.NK_ADMIN_SESSION_SECRET)return false;
 const expected=createHmac("sha256",process.env.NK_ADMIN_SESSION_SECRET).update(parts[0]).digest("hex");
 const a=Buffer.from(parts[1]),b=Buffer.from(expected);
 if(a.length!==b.length||!timingSafeEqual(a,b))return false;
 try{return JSON.parse(Buffer.from(parts[0],"base64url").toString()).exp>Date.now()}catch{return false}
}
export function unauthorized(){return NextResponse.json({error:"Authentication required."},{status:401})}
export async function db(path:string,init:RequestInit={}){
 const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)throw new Error("Supabase environment is not configured.");
 return fetch(url+"/rest/v1/"+path,{...init,headers:{apikey:key,Authorization:"Bearer "+key,"Content-Type":"application/json",Prefer:"return=representation",...(init.headers||{})},cache:"no-store"});
}