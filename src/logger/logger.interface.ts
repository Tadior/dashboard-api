import { Logger } from 'tslog';
import { ILogObj } from 'tslog/dist/types/interfaces';

export interface ILogger {
	logger: Logger<ILogObj>;
	log: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
	warn: (...args: unknown[]) => void;
}
