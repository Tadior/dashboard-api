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

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(SYMBOLS.ILogger).to(LoggerService);
	bind<IExeptionFilter>(SYMBOLS.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(SYMBOLS.UserController).to(UserController);
	bind<IUserService>(SYMBOLS.UserService).to(UserService);
	bind<App>(SYMBOLS.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(SYMBOLS.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
