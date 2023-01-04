import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.js";
import { injectable } from "inversify/lib/annotation/injectable.js";
import { inject } from "inversify";
import { SYMBOLS } from "../symbols.js";
import { ILogger } from "../logger/logger.interface.js";
import "reflect-metadata";
import { IUserController } from "./users.interface.js";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(SYMBOLS.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }
  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
    // next(new HTTPError(401, "Authorization error", "register"));
  }
  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "login");
  }
}
