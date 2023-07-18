
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"
import { UsersRepository } from "@/repositories/usersRepository"



interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
interface RegisterUseCaseResponse{
  user: User
}

export class RegisterUseCase {
constructor( private usersRepositoy: UsersRepository){

}
 async execute ({
  name,
  email,
  password,
}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

  const password_hash =  await hash(password,6) 

  const userWithSameEmail = await this.usersRepositoy.findByEmail(email)
  if (userWithSameEmail) {
    throw new UserAlreadyExistsError()
  }
 

  const user = await this.usersRepositoy.create({
  name,
  email,
  password_hash,
 })
 return {
  user,
 }

}
}