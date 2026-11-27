import { NextRequest,NextResponse } from "next/server";
import { authorized,unauthorized,db } from "@/lib/admin";
import { products as seedProducts } from "@/data/catalog";
export const runtime="nodejs";
function valid(p:any){return p&&typeof p.id==="string"&&/^[a-z0-9-]{2,80}$/.test(p.id)&&typeof p.name==="string"&&p.name.trim().length>0&&["Running","Lifestyle","Court","Training","Trail"].includes(p.category)&&Number.isFinite(Number(p.price))&&Number(p.price)>=0&&Number.isInteger(Number(p.stock))&&Number(p.stock)>=0&&Array.isArray(p.images)&&p.images.every((x:any)=>typeof x==="string"&&x.length<=2048)}
function normalize(p:any){return {id:p.id,name:p.name,category:p.category,price:Number(p.price)||0,stock:Number(p.stock)||0,featured:Boolean(p.featured),images:Array.isArray(p.images)?p.images:[],color:p.color||"",colorHex:p.colorHex||"#222222",description:p.description||"",story:p.story||"",upper:p.upper||"",sole:p.sole||"",drop:p.drop||"",weight:p.weight||"",...(p.compareAt?{compareAt:p.compareAt}:{}),...(p.tag?{tag:p.tag}:{})}}
export async function GET(req:NextRequest){
 if(!authorized(req))return unauthorized();
 try{
  const r=await db("nk_admin_products?select=*&order=updated_at.desc");
  if(!r.ok)throw new Error(await r.text());
  let rows=await r.json();
  if(rows.length===0){
   const seeded=seedProducts.map((p:any)=>({id:p.id,product:normalize(p),updated_at:new Date().toISOString()}));
   const insert=await db("nk_admin_products",{method:"POST",body:JSON.stringify(seeded)});
   if(!insert.ok)throw new Error(await insert.text());
   rows=await insert.json();
  }
  return NextResponse.json(rows);
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Storage error"},{status:503})}
}
export async function POST(req:NextRequest){
 if(!authorized(req))return unauthorized();
 const p=await req.json().catch(()=>null);if(!valid(p))return NextResponse.json({error:"Invalid product data."},{status:400});
 try{const r=await db("nk_admin_products",{method:"POST",body:JSON.stringify({id:p.id,product:p,updated_at:new Date().toISOString()})});const t=await r.text();if(!r.ok)throw new Error(t);return new NextResponse(t,{status:201,headers:{"Content-Type":"application/json"}})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Save failed"},{status:503})}
}
export async function PUT(req:NextRequest){
 if(!authorized(req))return unauthorized();
 const p=await req.json().catch(()=>null);if(!valid(p))return NextResponse.json({error:"Invalid product data."},{status:400});
 try{const r=await db("nk_admin_products?id=eq."+encodeURIComponent(p.id),{method:"PATCH",body:JSON.stringify({product:p,updated_at:new Date().toISOString()})});const t=await r.text();if(!r.ok)throw new Error(t);return new NextResponse(t,{headers:{"Content-Type":"application/json"}})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Update failed"},{status:503})}
}
export async function DELETE(req:NextRequest){
 if(!authorized(req))return unauthorized();
 const id=req.nextUrl.searchParams.get("id")||"";if(!/^[a-z0-9-]{2,80}$/.test(id))return NextResponse.json({error:"Invalid product ID."},{status:400});
 try{const r=await db("nk_admin_products?id=eq."+encodeURIComponent(id),{method:"DELETE"});if(!r.ok)throw new Error(await r.text());return NextResponse.json({ok:true})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Delete failed"},{status:503})}
}