import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	Entity,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Updoot } from "./Updoot";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	title!: string;

	@Field()
	@Column()
	body!: string;

	@Field()
	@Column({ type: "int", default: 0 })
	points!: number;

	@Field()
	@Column()
	creatorId: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.posts)
	creator: User;

	@OneToMany(() => Updoot, (updoot) => updoot.post)
	updoots: Updoot[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt = Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt = Date();
}
