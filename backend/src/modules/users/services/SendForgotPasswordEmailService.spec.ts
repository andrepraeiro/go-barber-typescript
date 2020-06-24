import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '1234560',
    });

    await sendForgotPasswordEmail.execute({
      email: 'teste@teste.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
  it('should be able to recover a non-existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'teste@teste.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
