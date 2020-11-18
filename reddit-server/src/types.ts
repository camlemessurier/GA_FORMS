import { Redis } from "ioredis";
import { Request, Response, Express } from "express";

export type MyContext = {
	redis: Redis;
	req: Request & { session: Express.Session };
	res: Response;
};
