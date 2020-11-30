import { Redis } from "ioredis";
import { Request, Response, Express } from "express";
import { createUserLoader } from "./utils/createUserLoader";
import { createUpdootLoader } from "./utils/createUpdootLoader";

export type MyContext = {
	redis: Redis;
	req: Request & { session: Express.Session };
	res: Response;
	userLoader: ReturnType<typeof createUserLoader>;
	updootLoader: ReturnType<typeof createUpdootLoader>;
};
