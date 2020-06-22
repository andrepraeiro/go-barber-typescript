import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      email: 'teste@teste.com',
      name: 'teste',
      password: '121344564',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user eith same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

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
