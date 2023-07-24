import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";


export class CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })
    return checkIn
  }
}