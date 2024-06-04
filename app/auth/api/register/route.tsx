
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
   try {
      const data = await request.json();

   const userFound = await prisma.user.findUnique({
      where: {
         email: data.email
      }
   })

   if (userFound) {
      return NextResponse.json({
         message: "El Email ya existe"
      }, {
         status: 400
      })
   }

   const userNameFound = await prisma.user.findUnique({
      where: {
         username: data.username
      }
   })

   if (userNameFound) {
      return NextResponse.json({
         message: "El usuario ya existe"
      }, {
         status: 400
      })
   }

   console.log(data);
   const hashedPassword = await bcrypt.hash(data.password, 10)
   const newUser = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        // Agregar aquí cualquier otro campo requerido por `UserCreateInput`
      },
    });

    const {password: _, ...user} = newUser

   return NextResponse.json(user)
   
   } catch (error: any) {
      return NextResponse.json(
         {
            message: error.message,
         },
         { 
            status: 500,
         }
     )

         
   }
}
