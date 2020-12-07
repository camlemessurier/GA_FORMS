const questions = {
	incident_details: [
		{
			name: "title",
			label: "Report Title",
			required: true,
			placeholder: "Tam lost his keys",
		},
		{
			name: "incidentDatetime",
			label: "Date and Time of incident",
			type: "datetime-local",
			required: true,
		},
		{
			name: "incidentLocation",
			label: "Incident location",
			required: false,
			placeholder: "12 Huntingdale Dr",
		},
		{
			name: "incidentDetails",
			label: "Incident details (what happened)",
			inputType: "textarea",
			required: true,
			placeholder:
				"Tam could not find his keys and was locked out of the office. ",
		},
		{
			name: "incidentWitnesses",
			label: "Incident witnesses",
			type: "textarea",
			placeholder: "Cam Le Messurier - Global Employee",
			required: false,
		},
		{
			name: "injurySustained",
			label: "Incident injury",
			inputType: "radio",
			required: true,
		},
		{
			name: "equipmentDamaged",
			label: "Incident equipment damage",
			inputType: "radio",
			required: true,
		},
	],
	safety_checks: [
		{
			name: "take5Completed",
			label: "Take 5 completed",
			inputType: "radio",
			required: false,
		},
		{
			name: "SWMScompleted",
			label: "SWMS completed",
			inputType: "radio",
			required: false,
		},
		{
			name: "fatiguePlanCompleted",
			label: "Fatigue plan completed",
			inputType: "radio",
			required: false,
		},
		{
			name: "siteProceduresFollowed",
			label: "Site specific procedures followed",
			inputType: "radio",
			required: false,
		},
	],

	injury_details: [
		{
			name: "injuryNature",
			label: "Nature of injury",
			type: "label",
			placeholder: "Tam lost his brain",
			required: false,
		},
		{
			name: "injuryLocation",
			label: "injury location",
			type: "label",
			placeholder: "head",
			required: false,
		},
		{
			name: "injuryAgency",
			label: "injury agency",
			type: "label",
			placeholder: "stupidity",
			required: false,
		},
		{
			name: "stoppedWork",
			label: "Stopped work",
			inputType: "radio",
			required: false,
		},
		{
			name: "treatmentRecieved",
			label: "Treatment recived",
			inputType: "radio",
			required: false,
		},
		{
			name: "treatmentDetails",
			label: "treamtnet details",
			inputType: "textarea",
			required: false,
			placeholder:
				"Tam was taken to the doctors, however they were unable to help locate his brain",
		},
	],
	equip_damage_details: [
		{
			name: "equipmentCompany",
			label: "Company of damaged equipment",
			type: "label",
			required: false,
			placeholder: "Global Employee",
		},
		{
			name: "equipmentItem",
			label: "equipment item/s",
			type: "label",
			placeholder: "Tam's brain",
			required: false,
		},
		{
			name: "damageDetails",
			label: "Details of damage to equipment",
			type: "label",
			required: false,
			placeholder: "Severe impairment",
		},
	],
	incident_investigation: [
		{
			name: "causalFactors",
			label: "Causal factors",
			inputType: "textarea",
			placeholder: "Doctors could not figure it out. ",
			required: true,
		},
		{
			name: "recurrenceLiklihood",
			label: "Liklhood of recurrence",
			type: "label",
			placeholder: "Out of 5",
			required: true,
		},
		{
			name: "outcomeSeverity",
			label: "Outcome severity",
			type: "label",
			placeholder: "Out of 5",
			required: true,
		},
		{
			name: "resultingRisk",
			label: "Resulting risk",
			placeholder: "Use SWMS matrix to calculate",
			type: "label",
			required: false,
		},
		{
			name: "actionsTaken",
			label: "Actions taken to mitigate risk",
			placeholder:
				"Cam gently tapped on Tam's head, which seemed to fix the problem",
			type: "textarea",
			required: false,
		},
		{
			name: "actionDate",
			label: "Action implented on",
			type: "date",
			required: false,
		},
		{
			name: "actionPerson",
			label: "By whom",
			placeholder: "Cam Le Messurier",
			type: "label",
			required: false,
		},
	],
};

export default questions;
