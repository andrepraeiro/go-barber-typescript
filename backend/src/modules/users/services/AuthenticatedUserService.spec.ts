import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      email: 'teste@teste.com',
      password: '121344564',
      name: 'Teste',
    });

    const response = await authenticateUser.execute({
      email: 'teste@teste.com',
      password: '121344564',
    });

    expect(response).toHaveProperty('token');
  });
});
