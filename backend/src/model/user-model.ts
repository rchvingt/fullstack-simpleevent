import { User, Session } from "@prisma/client";

export type UserResponse = {
	id: string;
	username: string;
	name: string;
	token?: string;
};

export type UserSession = {
	id: string;
	user_id: string;
	active_expires: BigInt;
	idle_expires: BigInt;
};

export type CreateUserRequest = {
	id: string;
	username: string;
	name: string;
	password: string;
};

export function toUserResponse(user: User): UserResponse {
	return {
		id: user.id,
		name: user.name,
		username: user.username,
	};
}

export function toUserSession(session: Session): UserSession {
	return {
		id: session.id,
		user_id: session.user_id,
		active_expires: session.idle_expires,
		idle_expires: session.idle_expires,
	};
}
