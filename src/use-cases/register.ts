import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"


interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
constructor( private usersRepositoy: UsersRepository){

}
 async execute ({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {

  const password_hash =  await hash(password,6) 

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    }
  })
  
  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }
 

 await this.usersRepositoy.create({
  name,
  email,
  password_hash,
 })

}
}