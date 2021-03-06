import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider.';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProiver: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProiver = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProiver
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'teste@teste.com',
      name: 'teste',
      password: '121344564',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with same email', async () => {
    await createUserService.execute({
      email: 'teste1@teste.com',
      name: 'teste',
      password: '121344564',
    });

    await expect(
      createUserService.execute({
        email: 'teste1@teste.com',
        name: 'teste',
        password: '121344564',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
