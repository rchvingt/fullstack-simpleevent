import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prismaClient } from "./database";
import { UserRequest } from "../type/user-request";

const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.user?.username,
			password: attributes.user?.password,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<UserRequest, "id">;
	}
}
