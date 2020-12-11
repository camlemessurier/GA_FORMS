const questions = {
	incident_details: [
		{
			name: "title",
			label: "Report Title",
			required: true,
			placeholder: "Short title explaining incident...",
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
			placeholder: "Incident Location...",
		},
		{
			name: "incidentDetails",
			label: "Incident details",
			inputType: "textarea",
			required: true,
			placeholder: "Describe what happened... ",
		},
		{
			name: "incidentWitnesses",
			label: "Incident witnesses",
			type: "textarea",
			placeholder: "List all witnesses...",
			required: false,
		},
		{
			name: "injurySustained",
			label: "Someone was injured during the incident?",
			inputType: "radio",
			required: true,
		},
		{
			name: "equipmentDamaged",
			label: "Equipment was damaged during the incident?",
			inputType: "radio",
			required: true,
		},
	],
	safety_checks: [
		{
			name: "take5Completed",
			label: "Take 5 completed?",
			inputType: "radio",
			required: false,
		},
		{
			name: "SWMScompleted",
			label: "SWMS completed?",
			inputType: "radio",
			required: false,
		},
		{
			name: "fatiguePlanCompleted",
			label: "Fatigue plan completed?",
			inputType: "radio",
			required: false,
		},
		{
			name: "siteProceduresFollowed",
			label: "Site specific procedures followed?",
			inputType: "radio",
			required: false,
		},
	],

	injury_details: [
		{
			name: "injuryNature",
			label: "Nature of injury",
			type: "label",
			placeholder:
				"Describe the injury, where it happened on the body, how serious it was, etc... ",
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
			placeholder: "Describe treatment in detail...",
		},
	],
	equip_damage_details: [
		{
			name: "equipmentCompany",
			label: "Company of damaged equipment",
			type: "label",
			required: false,
			placeholder: "Global, Hitachi, etc...",
		},
		{
			name: "equipmentItem",
			label: "equipment item/s",
			type: "label",
			placeholder: "Specific item",
			required: false,
		},
		{
			name: "damageDetails",
			label: "Details of damage to equipment",
			type: "label",
			required: false,
			placeholder: "Describe equipment damage",
		},
	],
	incident_investigation: [
		{
			name: "causalFactors",
			label: "Causal factors",
			inputType: "textarea",
			placeholder: "Analyse factors that led to incident...",
			required: true,
		},
		{
			name: "recurrenceLiklihood",
			label: "Liklhood of recurrence",
			type: "label",
			placeholder: "Out of 5. Use SWMS matrix",
			required: true,
		},
		{
			name: "outcomeSeverity",
			label: "Outcome severity",
			type: "label",
			placeholder: "Out of 5. Use SWMS matrix",
			required: true,
		},
		{
			name: "resultingRisk",
			label: "Resulting risk",
			placeholder: "Use SWMS matrix",
			type: "label",
			required: false,
		},
		{
			name: "actionsTaken",
			label: "Actions taken to mitigate risk",
			placeholder:
				"List specific actions to reduce liklihood and severity of incident occuring again...",
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
			placeholder: "List who actioned each control",
			type: "label",
			required: false,
		},
	],
};

export default questions;
