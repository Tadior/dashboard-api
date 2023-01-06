import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { SYMBOLS } from '../symbols';

@injectable()
export class PrismaService {
	client: PrismaClient;
	constructor(@inject(SYMBOLS.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}
	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('Connection to database has successful');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('Connection to database has failed');
			}
		}
	}
	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
