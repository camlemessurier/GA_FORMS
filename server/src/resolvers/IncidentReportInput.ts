import { Field, InputType } from "type-graphql";

@InputType()
export class IncidentReportInput {
	@Field()
	title: string;
	@Field()
	time: string;
	@Field()
	incidentLocation: string;
	@Field()
	incidentDetails: string;
	@Field()
	incidentWitnesses: string;
	@Field()
	take5Completed: boolean;
	@Field()
	SWMScompleted: boolean;
	@Field()
	fatiguePlanCompleted: boolean;
	@Field()
	siteProceduresFollowed: boolean;
	@Field()
	injurySustained: boolean;
	@Field()
	equipmentDamaged: boolean;
	@Field((type) => String)
	injuryNature: string;

	@Field((type) => String)
	injuryLocation: string;

	@Field((type) => String)
	injuryAgency: string;

	@Field((type) => Boolean)
	stoppedWork: boolean;

	@Field((type) => Boolean)
	treatmentRecieved: boolean;

	@Field((type) => String)
	treatmentDetails: string;

	@Field((type) => String)
	equipmentCompany: string;

	@Field((type) => String)
	equipmentItem: string;

	@Field((type) => String)
	damageDetails: string;

	@Field((type) => String)
	causalFactors: string;

	@Field((type) => String)
	recurrenceLiklihood: string;

	@Field((type) => String)
	outcomeSeverity: string;

	@Field((type) => String)
	resultingRisk: string;

	@Field((type) => String)
	actionsTaken: string;

	@Field((type) => String)
	actionDate: string;

	@Field((type) => String)
	actionPerson: string;
}
