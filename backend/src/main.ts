import { web } from "./application/web";
import { logger } from "./application/logging";
import type { User, Session } from "lucia";
web.listen(3000, () => {
	logger.info("Listening on port 3000");
});

console.log("Server running on port 3000");

declare global {
	namespace Express {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}
