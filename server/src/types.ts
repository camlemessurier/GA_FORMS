import { Redis } from "ioredis";
import { Request, Response, Express } from "express";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
	redis: Redis;
	req: Request & { session: Express.Session };
	res: Response;
	userLoader: ReturnType<typeof createUserLoader>;
};
