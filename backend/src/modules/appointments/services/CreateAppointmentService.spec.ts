import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider.';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProiver: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProiver = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      fakeCacheProiver
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '123123',
      user_id: '111',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 16);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
      user_id: '111',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
        user_id: '111',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123123',
        user_id: '111',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '123123',
        user_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8:00 AM and after 17:00 PM', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: 'provider_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 19),
        provider_id: 'provider_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
