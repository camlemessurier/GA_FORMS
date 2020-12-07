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

	@Field((type) => Boolean)
	@Column()
	isReviewed: boolean;

	@Field((type) => String)
	@Column()
	reviewer: string;

	// ----------------------- Incident Details ------------------------- //

	@Field((type) => String)
	@Column({ type: "time" })
	time: string;

	@Field((type) => String)
	@Column()
	incidentLocation: string;

	@Field((type) => String)
	@Column()
	incidentDetails: string;

	@Field((type) => String)
	@Column()
	incidentWitnesses: string;

	@Field((type) => Boolean)
	@Column()
	take5Completed: boolean;

	@Field((type) => Boolean)
	@Column()
	SWMScompleted: boolean;

	@Field((type) => Boolean)
	@Column()
	fatiguePlanCompleted: boolean;

	@Field((type) => Boolean)
	@Column()
	siteProceduresFollowed: boolean;

	@Field((type) => Boolean)
	@Column()
	injurySustained: boolean;

	@Field((type) => Boolean)
	@Column()
	equipmentDamaged: boolean;

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

	@Field((type) => Boolean)
	@Column()
	stoppedWork: boolean;

	@Field((type) => Boolean)
	@Column()
	treatmentRecieved: boolean;

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
