import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"


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

  const userWithSameEmail = await this.usersRepositoy.findByEmail(email)
  if (userWithSameEmail) {
    throw new UserAlreadyExistsError()
  }
 

 await this.usersRepositoy.create({
  name,
  email,
  password_hash,
 })

}
}