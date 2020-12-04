import { ObjectType, Field, Int } from "type-graphql";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field((type) => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field((type) => String)
	@Column()
	title!: string;

	@Field((type) => String)
	@Column()
	text!: string;

	@Field(() => Int)
	@Column({ type: "int", default: 0 })
	points!: number;

	@Field(() => Int, { nullable: true })
	voteStatus: number | null;

	@Field(() => Int)
	@Column()
	creatorId: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.posts)
	creator: User;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
