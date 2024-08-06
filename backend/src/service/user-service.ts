import { CreateUserRequest, toUserResponse, UserResponse, toUserSession, UserSession } from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { User } from "@prisma/client";
import { lucia } from "../application/auth";
import { logger } from "../application/logging";

export class UserService {
	static async register(request: CreateUserRequest): Promise<{ user: UserResponse; sessionCookie: string }> {
		const registerRequest = Validation.validate(UserValidation.REGISTER, request);

		const totalUserWithSameUsername = await prismaClient.user.count({
			where: {
				username: registerRequest.username,
			},
		});

		if (totalUserWithSameUsername != 0) {
			throw new ResponseError(400, "Username already exists");
		}

		registerRequest.id = uuid();
		registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

		const user = await prismaClient.user.create({
			data: registerRequest,
		});

		// const session = await lucia.createSession(registerRequest.id, {
		// 	expiresIn: 60 * 60 * 24 * 30,
		// });

		// const sessionCookie = lucia.createSessionCookie(session.id).serialize();

		const now = BigInt(Date.now());
		const activeExpires = now + BigInt(60 * 60 * 1000); // Contoh 1 jam kemudian
		const idleExpires = now + BigInt(30 * 60 * 1000); // Contoh 30 menit kemudian

		const session = await prismaClient.session.create({
			data: {
				id: uuid(),
				user_id: registerRequest.id,
				active_expires: activeExpires,
				idle_expires: idleExpires,
			},
		});

		// Create a session for the user
		// const session = await lucia.createSession(registerRequest.username, {});

		// Create session cookie
		const sessionCookie = lucia.createSessionCookie(session.id).serialize();
		return {
			user: toUserResponse(user), // This is the correct usage
			sessionCookie,
		};
		// return toUserResponse(user);
	}
}
