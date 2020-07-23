import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12234',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste1',
      email: 'teste1@teste.com',
    });

    expect(updatedUser.name).toEqual('teste1');
    expect(updatedUser.email).toEqual('teste1@teste.com');
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'existingemail@teste.com',
      password: '12234',
    });

    const user = await fakeUsersRepository.create({
      name: 'teste0',
      email: 'teste1@teste.com',
      password: '12234',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste1',
        email: 'existingemail@teste.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12234',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste1',
      email: 'teste1@teste.com',
      old_password: '12234',
      password: '123123',
    });

    expect(updatedUser.password).toEqual('123123');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12234',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste1',
        email: 'teste1@teste.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12234',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste1',
        email: 'teste1@teste.com',
        password: '123123',
        old_password: '11',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong user_id', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-exisiting-user-id',
        name: 'teste1',
        email: 'teste1@teste.com',
        password: '123123',
        old_password: '11',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
