import { validateRegister } from "./../utils/validateRegister";
import { COOKIE_NAME } from "./../constants";
import { EntityManager } from "@mikro-orm/postgresql";
import { MyContext } from "./../types";
import {
	Arg,
	Ctx,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";
import { UsernamePasswordInput } from "./UsernamePasswordInput";

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver()
export class UserResolver {
	@Mutation(() => Boolean)
	forgotPassword(@Arg("email") email: string, @Ctx() { em }: MyContext) {
		// const user = await em.findOne(User, { email });
		return true;
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() { em, req }: MyContext) {
		if (!req.session.userId) {
			return null;
		}

		const user = await em.findOne(User, { id: req.session.userId });
		return user;
	}

	// Register
	@Mutation(() => UserResponse)
	async register(
		@Arg("options") options: UsernamePasswordInput,
		@Ctx() { em, req }: MyContext
	) {
		const errors = validateRegister(options);
		if (errors) {
			return { errors };
		}

		const hashedPassword = await argon2.hash(options.password);
		let user;
		try {
			const result = await (em as EntityManager)
				.createQueryBuilder(User)
				.getKnexQuery()
				.insert({
					username: options.username,
					password: hashedPassword,
					email: options.email,
					created_at: new Date(),
					updated_at: new Date(),
				})
				.returning("*");
			user = result[0];
		} catch (err) {
			return {
				errors: [
					{
						field: "username",
						message: "username has already been taken",
					},
				],
			};
		}

		req.session.userId = user.id;

		return { user };
	}

	// Login
	@Mutation(() => UserResponse)
	async login(
		@Arg("usernameOrEmail") usernameOrEmail: string,
		@Arg("password") password: string,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse> {
		const user = await em.findOne(
			User,
			usernameOrEmail.includes("@")
				? { email: usernameOrEmail }
				: { username: usernameOrEmail }
		);
		if (!user) {
			return {
				errors: [
					{
						field: "usernameOrEmail",
						message: "that username doesn't exist",
					},
				],
			};
		}
		const valid = await argon2.verify(user.password, password);
		if (!valid) {
			return {
				errors: [
					{
						field: "password",
						message: "password is incorrect",
					},
				],
			};
		}

		req.session.userId = user.id;

		return {
			user,
		};
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) =>
			req.session.destroy((err: any) => {
				res.clearCookie(COOKIE_NAME);
				if (err) {
					console.log(err);
					resolve(false);
					return;
				}

				resolve(true);
			})
		);
	}
}
