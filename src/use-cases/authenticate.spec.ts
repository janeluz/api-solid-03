import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare, hash } from 'bcryptjs'
import{expect,describe,it, beforeEach} from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository:InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Register Use Case', () => {
  beforeEach(()=> {
     usersRepository = new InMemoryUsersRepository()
     sut = new AuthenticateUseCase(usersRepository)
  })

  it('should to register', async()=> {
   
      await usersRepository.create({
        name: 'Jane Rodrigues',
        email: 'janeteste@exampl.com',
        password_hash: await hash('123456',6),
      })
    const {user} = await sut.execute({
      
      email: 'janeteste@exampl.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))

  })
  it('should not be able to authenticate with wrong email', async()=> {

    expect(()=> sut.execute({
      email: 'janeteste@exampl.com',
      password: '1234560',

    })).rejects.toBeInstanceOf(InvalidCredentialsError)
      
  })
  it('should not be able to authenticate with wrong password', async()=> {

    await usersRepository.create({
      name: 'Jane Rodrigues',
      email: 'janeteste@exampl.com',
      password_hash: await hash('123456',6),
    })

    expect(()=> sut.execute({
      email: 'janeteste@exampl.com',
      password: '1234577',

    })).rejects.toBeInstanceOf(InvalidCredentialsError)
      
})
})
