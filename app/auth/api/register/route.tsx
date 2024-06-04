/*
import { NextResponse } from "next/server";

import { prisma } from "@/src/lib/prisma";

export async function POST(request) {
   const data = await request.json();

   console.log(data);

   const newUser = await prisma.user.create({
      data: data
   })
   return NextResponse.json(newUser)
   
}
*/