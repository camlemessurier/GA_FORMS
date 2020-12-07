import { Field, InputType } from "type-graphql";

@InputType()
export class IncidentReportInput {
	@Field()
	title: string;
	@Field()
	incidentDatetime: string;
	@Field()
	incidentLocation: string;
	@Field()
	incidentDetails: string;
	@Field()
	incidentWitnesses: string;
	@Field()
	take5Completed: string;
	@Field()
	SWMScompleted: string;
	@Field()
	fatiguePlanCompleted: string;
	@Field()
	siteProceduresFollowed: string;
	@Field()
	injurySustained: string;
	@Field()
	equipmentDamaged: string;
	@Field((type) => String)
	injuryNature: string;

	@Field((type) => String)
	injuryLocation: string;

	@Field((type) => String)
	injuryAgency: string;

	@Field((type) => String)
	stoppedWork: string;

	@Field((type) => String)
	treatmentRecieved: string;

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
