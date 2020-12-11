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
	@ManyToOne(() => User, (user) => user.incidentReports)
	creator: User;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field((type) => String, { nullable: true })
	@Column({ nullable: true })
	isReviewed: string;

	@Field((type) => String, { nullable: true })
	@Column({ nullable: true })
	reviewer: string;

	@Field((type) => String, { nullable: true })
	@Column({ nullable: true })
	reviewDate: Date;

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
	@Column({ nullable: true })
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
	@Column({ nullable: true })
	injuryNature: string;

	@Field((type) => String)
	@Column({ nullable: true })
	injuryAgency: string;

	@Field((type) => String)
	@Column({ nullable: true })
	stoppedWork: string;

	@Field((type) => String)
	@Column({ nullable: true })
	treatmentRecieved: string;

	@Field((type) => String)
	@Column({ nullable: true })
	treatmentDetails: string;

	// ----------------------- Equipment Damage Details ------------------------- //

	@Field((type) => String)
	@Column({ nullable: true })
	equipmentCompany: string;

	@Field((type) => String)
	@Column({ nullable: true })
	equipmentItem: string;

	@Field((type) => String)
	@Column({ nullable: true })
	damageDetails: string;

	// ----------------------- Incident Investigation ------------------------- //

	@Field((type) => String)
	@Column({ nullable: true })
	causalFactors: string;

	@Field((type) => String)
	@Column({ nullable: true })
	recurrenceLiklihood: string;

	@Field((type) => String)
	@Column({ nullable: true })
	outcomeSeverity: string;

	@Field((type) => String)
	@Column({ nullable: true })
	resultingRisk: string;

	@Field((type) => String)
	@Column({ nullable: true })
	actionsTaken: string;

	@Field((type) => String)
	@Column({ nullable: true })
	actionDate: string;

	@Field((type) => String)
	@Column({ nullable: true })
	actionPerson: string;
}
