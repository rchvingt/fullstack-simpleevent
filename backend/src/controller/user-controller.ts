import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";
import { logger } from "../application/logging";
import { lucia } from "../application/auth";

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateUserRequest = req.body as CreateUserRequest;
			const response = await UserService.register(request);
			console.log(response);
			res.status(200).append("Set-Cookie", response.sessionCookie).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}
	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const request: LoginUserRequest = req.body as LoginUserRequest;
			const response = await UserService.login(request);
			res.status(200).append("Set-Cookie", response.sessionCookie).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async get(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const response = await UserService.get(res.locals.user?.id!);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async update(req: UserRequest, res: Response, next: NextFunction) {
		const userId = res.locals.user?.id;

		try {
			const request: UpdateUserRequest = req.body as UpdateUserRequest;
			if (!userId) {
				throw new Error("User not found");
			}
			const response = await UserService.update(userId!, request);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async logout(req: UserRequest, res: Response, next: NextFunction) {
		try {
			await UserService.logout(res.locals.session?.id!);
			res.status(200).append("Set-Cookie", lucia.createBlankSessionCookie().serialize()).json({
				data: "OK",
			});
		} catch (e) {
			next(e);
		}
	}
}
