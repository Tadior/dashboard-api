import { Logger } from "tslog";
import { ILogObj } from "tslog/dist/types/interfaces.js";
import { ILogger } from "./logger.interface";
import { injectable } from "inversify/lib/annotation/injectable.js";
import "reflect-metadata";

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>;
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
