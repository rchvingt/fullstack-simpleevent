import { verifyRequestOrigin } from "lucia";
import { UserRequest } from "../type/user-request";
import { Request, Response, NextFunction } from "express";
import { lucia } from "../application/auth";
import { logger } from "../application/logging";
import { prismaClient } from "../application/database";

export const luciaMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
	const originHeader = req.headers.origin ?? null;

	const hostHeader = req.headers.host ?? null;

	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
		res.status(403)
			.json({
				errors: "Unauthorized",
			})
			.end();
	}

	return next();
};

export const luciaValidateSession = async (req: UserRequest, res: Response, next: NextFunction) => {
	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
	if (!sessionId) {
		logger.warn("No session ID found in cookie.");
		return res.status(401).json({ error: "Session not found. Please log in." });
	}

	try {
		const { session, user } = await lucia.validateSession(sessionId);

		if (!session) {
			logger.warn("Invalid session. Redirecting to login.");
			res.append("Set-Cookie", lucia.createBlankSessionCookie().serialize());
			return res.status(401).json({ error: "Invalid session. Please log in again." });
		}

		if (session.fresh) {
			res.append("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
		}

		res.locals.session = session;
		// console.log(res.locals.session);
		res.locals.user = user;
		// console.log(res.locals.user);
	} catch (error) {
		logger.error("Session validation error:", error);
		return res.status(500).json({ error: "Internal server error during session validation." });
	}

	return next();
};
