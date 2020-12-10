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
import helmet from "helmet";
require("dotenv").config();

const main = async () => {
	const conn = await createConnection({
		type: "postgres",
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		logging: true,
		synchronize: true,
		migrations: [path.join(__dirname, "./migrations/*")],
		entities: [Post, User, IncidentReport],
	});
	if (process.env.NODE_ENV === "prod") {
		conn.runMigrations(); // comment for prod
	}

	const app = express();
	const RedisStore = connectRedis(session);
	const redis = new Redis();

	app.use(
		cors({
			origin: "*",
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
				secure: true,
				sameSite: "lax",
			},
			saveUninitialized: false,
			secret: "sadfasdeiwiehndyeah",
			resave: false,
		})
	);

	app.use(helmet());

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
