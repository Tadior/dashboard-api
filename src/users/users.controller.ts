import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { injectable } from 'inversify/lib/annotation/injectable';
import { inject } from 'inversify';
import { SYMBOLS } from '../symbols';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './users.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(SYMBOLS.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}
	register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		this.ok(res, 'register');
		// next(new HTTPError(401, "Authorization error", "register"));
	}
	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		this.ok(res, 'login');
	}
}
