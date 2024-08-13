import { User, Session } from "@prisma/client";
import { logger } from "../application/logging";

export type UserResponse = {
	id: string;
	username: string;
	name: string;
	token?: string;
};

// export type UserSession = {
// 	id: string;
// 	userId: string;
// 	expiresAt: Date;
// 	fresh: Boolean;

// };

export type CreateUserRequest = {
	id: string;
	username: string;
	name: string;
	password: string;
};

export type LoginUserRequest = {
	username: string;
	password: string;
};

export type UpdateUserRequest = {
	name?: string;
	password?: string;
};

export function toUserResponse(user: User): UserResponse {
	return {
		id: user.id,
		name: user.name,
		username: user.username,
	};
}

// export function toUserSession(session: Session): UserSession {
// 	return {
// 		id: session.id,
// 		userId: session.userId,
// 		expiresAt: session.expiresAt,
// 		fresh: session.fresh,
// 	};
// }
