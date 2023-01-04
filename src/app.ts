import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { ILogger } from "./logger/logger.interface.js";
import { injectable } from "inversify/lib/annotation/injectable.js";
import { inject } from "inversify";
import { SYMBOLS } from "./symbols.js";
import "reflect-metadata";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;
  constructor(
    @inject(SYMBOLS.ILogger) private logger: ILogger,
    @inject(SYMBOLS.UserController) private userController: UserController,
    @inject(SYMBOLS.ExeptionFilter) private exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }
  useRoutes() {
    this.app.use("/users", this.userController.router);
  }
  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }
  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on localhost: ${this.port}`);
  }
}
