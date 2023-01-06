import { injectable, inject } from 'inversify';
import { ILogger } from '../src/logger/logger.interface';
import { SYMBOLS } from '../src/symbols';
import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(SYMBOLS.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('.env is empty');
		} else {
			this.logger.log('Configuration has been added');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
