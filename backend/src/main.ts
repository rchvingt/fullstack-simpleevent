import { web } from "./application/web";
import { logger } from "./application/logging";
import type { User, Session } from "lucia";
// import type { User, Session } from "@prisma/client";
const PORT = process.env.PORT || 3000;
web.listen(PORT, () => {
	logger.info("Listening on port 3000");
});

declare global {
	namespace Express {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}
