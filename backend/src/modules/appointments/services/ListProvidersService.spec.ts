import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12234',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'teste1',
      email: 'teste1@teste.com',
      password: '12234',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'loggedUser',
      email: 'loggedUser@teste.com',
      password: '12234',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
