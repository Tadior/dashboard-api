import { Container } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { SYMBOLS } from './symbols';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ContainerModule } from 'inversify/lib/container/container_module';
import { interfaces } from 'inversify/lib/interfaces/interfaces';
import { IUserController } from './users/users.interface';
import { IUserService } from './users/users.service.interface';
import { UserService } from './users/users.service';
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(SYMBOLS.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(SYMBOLS.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<IUserController>(SYMBOLS.UserController).to(UserController).inSingletonScope();
	bind<IUserService>(SYMBOLS.UserService).to(UserService).inSingletonScope();
	bind<PrismaService>(SYMBOLS.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(SYMBOLS.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(SYMBOLS.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(SYMBOLS.Application).to(App).inSingletonScope();
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(SYMBOLS.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
