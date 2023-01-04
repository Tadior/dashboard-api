import { NextFunction, Request, Response } from "express";
import { IExeptionFilter } from "./exeption.filter.interface.js";
import { HTTPError } from "./http-error.class.js";
import { injectable } from "inversify/lib/annotation/injectable.js";
import { ILogger } from "../logger/logger.interface.js";
import { inject } from "inversify/lib/annotation/inject.js";
import { SYMBOLS } from "../symbols.js";
import "reflect-metadata";

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(@inject(SYMBOLS.ILogger) private logger: ILogger) {}
  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.context}] Ошибка ${err.statusCode} : ${err.message}`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
