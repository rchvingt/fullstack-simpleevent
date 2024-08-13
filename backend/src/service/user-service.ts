import { CreateUserRequest, toUserResponse, UserResponse, LoginUserRequest, UpdateUserRequest } from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { User } from "@prisma/client";
import { lucia } from "../application/auth";
import { logger } from "../application/logging";
import { generateId } from "lucia";

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

		const session = await lucia.createSession(registerRequest.id, {}, { sessionId: generateId(15) });

		// Create session cookie
		const sessionCookie = lucia.createSessionCookie(session.id).serialize();

		return {
			user: toUserResponse(user),
			sessionCookie: sessionCookie,
		};
	}

	static async login(request: LoginUserRequest): Promise<{ user: UserResponse; sessionCookie: string }> {
		const loginRequest = Validation.validate(UserValidation.LOGIN, request);

		// check if user existed
		let user = await prismaClient.user.findUnique({
			where: {
				username: loginRequest.username,
			},
		});

		if (!user) {
			throw new ResponseError(401, "Username or password is wrong");
		}

		const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
		if (!isPasswordValid) {
			throw new ResponseError(401, "Username or password is wrong");
		}

		const sessionId = generateId(15);

		const session = await lucia.createSession(user.id, {}, { sessionId: sessionId });

		// Create session cookie
		const sessionCookie = lucia.createSessionCookie(session.id).serialize();

		return {
			user: toUserResponse(user),
			sessionCookie,
		};
	}

	static async checkUserMustExists(userId: string): Promise<User> {
		const users = await prismaClient.user.findFirst({
			where: {
				id: userId,
			},
		});

		if (!users) {
			throw new ResponseError(404, "User is not found");
		}

		return users;
	}
	static async get(userId: string): Promise<UserResponse> {
		const user = await this.checkUserMustExists(userId);
		return toUserResponse(user);
	}

	static async update(userId: string, request: UpdateUserRequest): Promise<UserResponse> {
		const updateRequest = Validation.validate(UserValidation.UPDATE, request);
		const user = await this.checkUserMustExists(userId);

		if (updateRequest.name) {
			user.name = updateRequest.name;
		}

		if (updateRequest.password) {
			user.password = await bcrypt.hash(updateRequest.password, 10);
		}

		const result = await prismaClient.user.update({
			where: {
				id: userId,
			},
			data: user,
		});

		return toUserResponse(result);
	}

	static async logout(sessionId: string): Promise<void> {
		await lucia.invalidateSession(sessionId);
	}
}
