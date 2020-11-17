import { MyContext } from "./types";
import { PostResolver } from "./resolvers/post";
import "reflect-metadata";
import { HelloResolver } from "./resolvers/hello";
import { Post } from "./entities/Post";
import { COOKIE_NAME, __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import cors from "cors";

import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

const main = async () => {
	const orm = await MikroORM.init(microConfig);
	await orm.getMigrator().up();
	const app = express();
	const RedisStore = connectRedis(session);
	const redisClient = redis.createClient();

	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);
	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({ client: redisClient, disableTouch: true }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
				httpOnly: true,
				secure: __prod__, // cookie only works in https
				sameSite: "lax",
			},
			saveUninitialized: false,
			secret: "asdfasdgjklasdfhjk",
			resave: false,
		})
	);

	//hello

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			em: orm.em,
			req,
			res,
		}),
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(4000, () => {
		console.log("Server on 4000");
	});
};

main().catch((err) => {
	console.log(err);
});
