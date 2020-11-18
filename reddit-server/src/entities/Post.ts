import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
} from "typeorm";
import { Entity } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt = Date();

	@Field()
	@Column()
	title!: string;
}
