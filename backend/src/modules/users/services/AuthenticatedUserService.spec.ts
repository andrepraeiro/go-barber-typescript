import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to authenticate a user with correct credentials', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      email: 'teste@teste.com',
      password: '121344564',
      name: 'Teste',
    });

    const response = await authenticateUser.execute({
      email: 'teste@teste.com',
      password: '121344564',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate a user with incorrect password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      email: 'teste@teste.com',
      password: '121344564',
      name: 'Teste',
    });

    await expect(
      authenticateUser.execute({
        email: 'teste@teste.com',
        password: '1213',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with incorrect email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      email: 'teste@teste.com',
      password: '121344564',
      name: 'Teste',
    });

    await expect(
      authenticateUser.execute({
        email: 'teste1@teste.com',
        password: '121344564',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await expect(
      authenticateUser.execute({
        email: 'teste1@teste.com',
        password: '121344564',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
