import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { injectable } from 'inversify/lib/annotation/injectable';
import { inject } from 'inversify';
import { SYMBOLS } from './symbols';
import 'reflect-metadata';
import { IUserController } from './users/users.interface';
import { IConfigService } from '../config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { PrismaService } from './database/prisma.service';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	constructor(
		@inject(SYMBOLS.ILogger) private logger: ILogger,
		@inject(SYMBOLS.UserController) private userController: UserController,
		@inject(SYMBOLS.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(SYMBOLS.ConfigService) private configService: IConfigService,
		@inject(SYMBOLS.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = userController;
		this.exeptionFilter = exeptionFilter;
	}
	useMiddleware(): void {
		this.app.use(express.json());
	}
	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}
	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}
	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started on localhost: ${this.port}`);
	}
}
