import { Logger } from "tslog";
import { ILogObj } from "tslog/dist/types/interfaces.js";

export class LoggerService {
  private logger: Logger<ILogObj>;
  constructor() {
    this.logger = new Logger();
  }
  log(...args: unknown[]) {
    this.logger.info(args);
  }
  error(...args: unknown[]) {
    this.logger.error(args);
  }
  warn(...args: unknown[]) {
    this.logger.warn(args);
  }
}
