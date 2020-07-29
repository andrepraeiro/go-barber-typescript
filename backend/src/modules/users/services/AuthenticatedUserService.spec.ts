import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    process.env.APP_SECRET = 'app-secret';
  });
  it('should be able to authenticate a user with correct credentials', async () => {
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
    await expect(
      authenticateUser.execute({
        email: 'teste1@teste.com',
        password: '121344564',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
