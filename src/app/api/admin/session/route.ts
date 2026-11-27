import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
export const runtime = "nodejs";
const cookieName = "nk_admin_session";
function sign(value:string){return createHmac("sha256",process.env.NK_ADMIN_SESSION_SECRET!).update(value).digest("hex")}
export async function POST(req:NextRequest){
  const expected=process.env.NK_ADMIN_PASSWORD, secret=process.env.NK_ADMIN_SESSION_SECRET;
  if(!expected||!secret||secret.length<32)return NextResponse.json({error:"Admin environment is not configured."},{status:503});
  const origin=req.headers.get("origin");
  if(origin && origin!==new URL(req.url).origin)return NextResponse.json({error:"Invalid origin."},{status:403});
  const body=await req.json().catch(()=>null);
  const password=typeof body?.password==="string"?body.password:"";
  const a=Buffer.from(password),b=Buffer.from(expected);
  if(a.length!==b.length||!timingSafeEqual(a,b))return NextResponse.json({error:"Incorrect password."},{status:401});
  const token=Buffer.from(JSON.stringify({exp:Date.now()+8*60*60*1000,nonce:crypto.randomUUID()})).toString("base64url");
  const response=NextResponse.json({ok:true});
  response.cookies.set(cookieName,token+"."+sign(token),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/api/admin",maxAge:8*60*60});
  return response;
}
export async function DELETE(){
 const response=NextResponse.json({ok:true});
 response.cookies.set(cookieName,"",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/api/admin",maxAge:0});
 return response;
}