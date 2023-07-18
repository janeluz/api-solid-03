import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare, hash } from 'bcryptjs'
import{expect,describe,it} from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'



describe('Register Use Case', () => {

  it('should to register', async()=> {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(()=> sut.execute({
      email: 'janeteste@exampl.com',
      password: '1234560',

    })).rejects.toBeInstanceOf(InvalidCredentialsError)
      
  })
  it('should not be able to authenticate with wrong password', async()=> {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
