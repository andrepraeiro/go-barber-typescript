import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      email: 'teste@teste.com',
      name: 'teste',
      password: '121344564',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      email: 'teste1@teste.com',
      name: 'teste',
      password: '121344564',
    });

    expect(
      createUserService.execute({
        email: 'teste1@teste.com',
        name: 'teste',
        password: '121344564',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
