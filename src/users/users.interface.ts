import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';

export interface IUserController extends BaseController {
	register: (req: Request, res: Response, next: NextFunction) => void;
	login: (req: Request, res: Response, next: NextFunction) => void;
}
