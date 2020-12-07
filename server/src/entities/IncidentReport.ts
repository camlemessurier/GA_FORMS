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
export class IncidentReport extends BaseEntity {
	//
	// ----------------------- Report Details ------------------------- //

	@Field((type) => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field((type) => String)
	@Column()
	title!: string;

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

	@Field((type) => String)
	@Column()
	isReviewed: string;

	@Field((type) => String)
	@Column()
	reviewer: string;

	// ----------------------- Incident Details ------------------------- //

	@Field((type) => String)
	@Column()
	incidentDatetime: string;

	@Field((type) => String)
	@Column()
	incidentLocation: string;

	@Field((type) => String)
	@Column()
	incidentDetails: string;

	@Field((type) => String)
	@Column()
	incidentWitnesses: string;

	@Field((type) => String)
	@Column()
	take5Completed: string;

	@Field((type) => String)
	@Column()
	SWMScompleted: string;

	@Field((type) => String)
	@Column()
	fatiguePlanCompleted: string;

	@Field((type) => String)
	@Column()
	siteProceduresFollowed: string;

	@Field((type) => String)
	@Column()
	injurySustained: string;

	@Field((type) => String)
	@Column()
	equipmentDamaged: string;

	// ----------------------- Injury Details ------------------------- //

	@Field((type) => String)
	@Column()
	injuryNature: string;

	@Field((type) => String)
	@Column()
	injuryLocation: string;

	@Field((type) => String)
	@Column()
	injuryAgency: string;

	@Field((type) => String)
	@Column()
	stoppedWork: string;

	@Field((type) => String)
	@Column()
	treatmentRecieved: string;

	@Field((type) => String)
	@Column()
	treatmentDetails: string;

	// ----------------------- Equipment Damage Details ------------------------- //

	@Field((type) => String)
	@Column()
	equipmentCompany: string;

	@Field((type) => String)
	@Column()
	equipmentItem: string;

	@Field((type) => String)
	@Column()
	damageDetails: string;

	// ----------------------- Incident Investigation ------------------------- //

	@Field((type) => String)
	@Column()
	causalFactors: string;

	@Field((type) => String)
	@Column()
	recurrenceLiklihood: string;

	@Field((type) => String)
	@Column()
	outcomeSeverity: string;

	@Field((type) => String)
	@Column()
	resultingRisk: string;

	@Field((type) => String)
	@Column()
	actionsTaken: string;

	@Field((type) => String)
	@Column()
	actionDate: string;

	@Field((type) => String)
	@Column()
	actionPerson: string;
}
