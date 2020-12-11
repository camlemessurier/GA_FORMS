import { IncidentReportResolver } from "./resolvers/incidentReport";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { IncidentReport } from "./entities/IncidentReport";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import path from "path";
import { createUserLoader } from "./utils/createUserLoader";
require("dotenv").config();

const main = async () => {
	const conn = await createConnection({
		type: "postgres",
		username: process.env.POSTGRES_USER || "camlemessurier",
		password: process.env.POSTGRES_PASSWORD || "postgres",
		database: process.env.POSTGRES_DB || "ga_cam",
		//synchronize: true,
		//host: "postgres",
		logging: true,
		migrations: [path.join(__dirname, "./migrations/*")],
		entities: [Post, User, IncidentReport],
	});
	conn.runMigrations();

	const app = express();
	const RedisStore = connectRedis(session);
	const redis = new Redis(); // swtich to redis for docker

	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);

	app.use(
		session({
			name: "session",
			store: new RedisStore({ client: redis, disableTouch: true }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
				httpOnly: true,
				secure: false,
				sameSite: "lax",
			},
			saveUninitialized: false,
			secret: "sadfasdeiwiehndyeah",
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [PostResolver, UserResolver, IncidentReportResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
			redis,
			userLoader: createUserLoader(),
		}),
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(4000, () => {
		console.log("Server on localhost:4000");
	});
};

main().catch((err) => {
	console.log(err);
});
