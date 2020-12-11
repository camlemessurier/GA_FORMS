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
import { User } from "./entities/User";
import { IncidentReport } from "./entities/IncidentReport";
import { UserResolver } from "./resolvers/user";
import path from "path";
import { createUserLoader } from "./utils/createUserLoader";
require("dotenv").config();

const main = async () => {
	// Setting up database and typeorm
	const conn = await createConnection({
		type: "postgres",
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST || undefined,
		logging: true,
		migrations: [path.join(__dirname, "./migrations/*")],
		entities: [User, IncidentReport],
	});
	conn.runMigrations(); // Running migration that haven't run yet

	// Setting up express middleware
	const app = express();
	app.use(
		cors({
			origin: true,
			credentials: true,
		})
	);

	// Setting up redis for cookie storage
	const RedisStore = connectRedis(session);
	const redis = new Redis(process.env.REDIS_HOST || undefined);

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

	// Setting up Apollo server
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, IncidentReportResolver],
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
		console.log("Server running at localhost:4000/graphql");
	});
};

main().catch((err) => {
	console.log(err);
});
