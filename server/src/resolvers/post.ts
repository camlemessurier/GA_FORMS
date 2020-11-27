import { Updoot } from "./../entities/Updoot";
import { getConnection } from "typeorm";
import { isAuth } from "./../middleware/isAuth";
import { MyContext } from "./../types";
import {
	Arg,
	Args,
	Ctx,
	Field,
	FieldResolver,
	Info,
	InputType,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import { Post } from "./../entities/Post";

@InputType()
class PostInput {
	@Field()
	title: string;
	@Field()
	body: string;
}

@ObjectType()
class PaginatedPosts {
	@Field(() => [Post])
	posts: Post[];
	@Field()
	hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => String)
	textSnippet(@Root() root: Post) {
		return root.body.slice(0, 50);
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async vote(
		@Arg("postId", () => Int) postId: number,
		@Arg("value", () => Int) value: number,
		@Ctx() { req }: MyContext
	) {
		const { userId } = req.session;
		const isUpdoot = value !== -1;
		const realValue = isUpdoot ? 1 : -1;
		// await Updoot.insert({
		// 	userId,
		// 	postId,
		// 	value: realValue,
		// });
		await getConnection().query(
			`
			START TRANSACTION
			insert into updoot("userId", "postId", value )
			values ($1, $2, $3)
		update post
		set points = points + $4
		where id = $5
		COMMIT
		`,
			[userId, postId, realValue, realValue, postId]
		);
		return true;
	}

	@Query(() => PaginatedPosts)
	async posts(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null
	): Promise<PaginatedPosts> {
		const realLimit = Math.min(50, limit);
		const realLimitPlusOne = realLimit + 1;

		const replacements: any[] = [realLimitPlusOne];

		if (cursor) {
			replacements.push(new Date(parseInt(cursor)));
		}

		const posts = await getConnection().query(
			`select p.*
from post p
${cursor ? `where p."createdAt" < $2` : ""}
order by p."createdAt" DESC
limit $1
			`,
			replacements
		);

		// const qb = getConnection()
		// 	.getRepository(Post)
		// 	.createQueryBuilder("p")
		// 	.innerJoinAndSelect("p.creator", "u", 'u.id = "p.creatorId"')
		// 	.orderBy('p."createdAt"', "DESC")
		// 	.take(realLimitPlusOne);

		// const posts = await qb.getMany();
		return {
			posts: posts.slice(0, realLimit),
			hasMore: posts.length === realLimitPlusOne,
		};
	}

	@Query(() => Post, { nullable: true })
	post(@Arg("id") id: number): Promise<Post | undefined> {
		return Post.findOne(id);
	}

	@Mutation(() => Post)
	@UseMiddleware(isAuth)
	createPost(
		@Arg("input") input: PostInput,
		@Ctx() { req }: MyContext
	): Promise<Post> {
		if (!req.session.userId) {
			throw new Error("not authenitcated");
		}
		return Post.create({ ...input, creatorId: req.session.userId }).save();
	}

	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg("id") id: number,
		@Arg("title", () => String, { nullable: true }) title: string
	): Promise<Post | null> {
		const post = await Post.findOne(id);
		if (!post) {
			return null;
		}
		if (typeof title !== "undefined") {
			post.title = title;
			await Post.update({ id }, { title });
		}
		return post;
	}

	@Mutation(() => Boolean)
	async deletePost(@Arg("id") id: number): Promise<boolean> {
		await Post.delete(id);
		return true;
	}
}
