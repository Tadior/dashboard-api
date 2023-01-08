import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { SYMBOLS } from '../symbols';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};
const UserRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(SYMBOLS.UserService).to(UserService);
	container.bind<IConfigService>(SYMBOLS.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(SYMBOLS.UsersRepository).toConstantValue(UserRepositoryMock);
	configService = container.get<IConfigService>(SYMBOLS.ConfigService);
	usersRepository = container.get<IUsersRepository>(SYMBOLS.UsersRepository);
	usersService = container.get<IUserService>(SYMBOLS.UserService);
});

let createdUser: UserModel | null;

describe('User service', () => {
	it('CreateUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await usersService.createUser({
			email: 'dfdvdsv@email.ru',
			name: 'Alexander',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual(1);
	});
	it('Validate user - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'dfdvdsv@email.ru',
			password: '1',
		});
		expect(res).toBeTruthy();
	});
	it('Validate user - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'dfdvdsv@email.ru',
			password: '2',
		});
		expect(res).toBeFalsy();
	});
	it('Validate user - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await usersService.validateUser({
			email: 'dfdvds2v@email.ru',
			password: '1',
		});
		expect(res).toBeFalsy();
	});
});
