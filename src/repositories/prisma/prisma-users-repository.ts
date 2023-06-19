import {prisma } from '@/lib/prisma'
import { Prisma } from "@prisma/client"

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
  }
  async findByEmail(email:string){
    const user = await prisma.user.findUnique({
      where:{
        email
      },
    })
  }
}