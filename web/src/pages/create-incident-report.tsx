import { Box, Button, Text, Flex, Heading, Divider } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateIncidentReportMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import questions from "../questions";
import * as Yup from "yup";

const IncidentReportSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	incidentDatetime: Yup.string().required("Field Required"),
	incidentDetails: Yup.string().required("Field Required"),
	injurySustained: Yup.string().required("Field Required"),
	equipmentDamaged: Yup.string().required("Field Required"),
	causalFactors: Yup.string().required("Field Required"),
	recurrenceLiklihood: Yup.string().required("Field Required"),
	outcomeSeverity: Yup.string().required("Field Required"),
});

const CreatePost: React.FC<{}> = ({}) => {
	const [createReport] = useCreateIncidentReportMutation();
	const router = useRouter();
	useIsAuth();
	return (
		<Layout variant="small">
			<Formik
				initialValues={incidentReportsInitialValues}
				validationSchema={IncidentReportSchema}
				enableReinitialize
				onSubmit={async (values) => {
					const { errors } = await createReport({
						variables: { input: values },
						update: (cache) => {
							cache.reset();
						},
					});
					if (!errors) {
						router.push("/incident-reports");
					}
				}}
			>
				{({ isSubmitting, values, errors }) => (
					<>
						<Form>
							<Heading color="blue.600" mt={8} mb={4} as="h3">
								Incident Details
							</Heading>
							{questions.incident_details.map((question) => (
								<Box mb={8}>
									<InputField
										name={question.name}
										label={question.label}
										inputType={question.inputType}
										type={question.type}
										key={question.name}
										placeholder={question.placeholder}
										required={question.required}
									/>
								</Box>
							))}

							<Heading color="blue.600" mt={20} mb={2} as="h3">
								Safety Checks
							</Heading>
							{questions.safety_checks.map((question) => (
								<Box mb={8}>
									<InputField
										name={question.name}
										label={question.label}
										inputType={question.inputType}
										key={question.name}
										required={question.required}
									/>
								</Box>
							))}

							<Heading color="blue.600" mt={20} mb={2} as="h3">
								Injury Details
							</Heading>
							{values.injurySustained === "Yes" ? (
								questions.injury_details.map((question) => (
									<Box mb={8}>
										<InputField
											name={question.name}
											label={question.label}
											inputType={question.inputType}
											type={question.type}
											key={question.name}
											placeholder={question.placeholder}
											required={question.required}
										/>
									</Box>
								))
							) : (
								<Box>No injury selected</Box>
							)}

							<Heading color="blue.600" mt={20} mb={2} as="h3">
								Equipment Damage
							</Heading>

							{values.equipmentDamaged === "Yes" ? (
								questions.equip_damage_details.map((question) => (
									<Box mb={8}>
										<InputField
											name={question.name}
											label={question.label}
											type={question.type}
											key={question.name}
											placeholder={question.placeholder}
											required={question.required}
										/>
									</Box>
								))
							) : (
								<Box>No equipment damaged selected</Box>
							)}

							<Heading color="blue.600" mt={20} mb={2} as="h3">
								Incident Investigation
							</Heading>

							{questions.incident_investigation.map((question) => (
								<Box mb={8}>
									<InputField
										name={question.name}
										label={question.label}
										type={question.type}
										key={question.name}
										placeholder={question.placeholder}
										required={question.required}
										inputType={question.inputType}
									/>
								</Box>
							))}

							<Flex mt={10}>
								<Button
									type="submit"
									isLoading={isSubmitting}
									bg="blue.600"
									color="white"
									margin="auto"
									size="lg"
								>
									Post
								</Button>
							</Flex>

							<br />
							<br />
						</Form>
					</>
				)}
			</Formik>
		</Layout>
	);
};

const incidentReportsInitialValues = {
	title: "",
	incidentDatetime: "",
	incidentLocation: "",
	incidentDetails: "",
	incidentWitnesses: "",
	injurySustained: "",
	equipmentDamaged: "",
	take5Completed: "",
	SWMScompleted: "",
	fatiguePlanCompleted: "",
	siteProceduresFollowed: "",
	injuryNature: "",
	injuryAgency: "",
	stoppedWork: "",
	treatmentRecieved: "",
	treatmentDetails: "",
	equipmentItem: "",
	equipmentCompany: "",
	damageDetails: "",
	causalFactors: "",
	resultingRisk: "",
	recurrenceLiklihood: "",
	outcomeSeverity: "",
	actionsTaken: "",
	actionDate: "",
	actionPerson: "",
	isReviewed: "No",
};

export default CreatePost;
