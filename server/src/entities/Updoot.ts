import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	Entity,
	ManyToOne,
	PrimaryColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
	@Field()
	@Column({ type: "int" })
	value: number;

	@Field()
	@PrimaryColumn()
	userId: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.updoots)
	user: User;

	@Field()
	@PrimaryColumn()
	postId: number;

	@Field(() => Post)
	@ManyToOne(() => Post, (post) => post.updoots)
	post: Post;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt = Date();
}
