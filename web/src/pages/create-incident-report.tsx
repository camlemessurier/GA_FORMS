import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
	useCreateIncidentReportMutation,
	useCreatePostMutation,
	useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import questions from "../questions";

const CreatePost: React.FC<{}> = ({}) => {
	const [createReport] = useCreateIncidentReportMutation();
	const router = useRouter();
	useIsAuth();
	return (
		<Layout variant="small">
			<Formik
				initialValues={incidentReportsInitialValues}
				onSubmit={async (values) => {
					console.log(values);
					const { errors } = await createReport({
						variables: { input: values },
						update: (cache) => {
							cache.evict({ fieldName: "incidentReports:{}" });
						},
					});
					console.log(errors);
					if (!errors) {
						router.push("/");
					}
				}}
			>
				{({ isSubmitting, values }) => (
					<>
						<Form>
							<Heading mt={10} mb={2} as="h3">
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
									/>
								</Box>
							))}

							<Heading mt={20} mb={2} as="h3">
								Safety Checks
							</Heading>
							{questions.safety_checks.map((question) => (
								<Box mb={8}>
									<InputField
										name={question.name}
										label={question.label}
										inputType={question.inputType}
										key={question.name}
									/>
								</Box>
							))}

							<Heading mt={20} mb={2} as="h3">
								Injury Details
							</Heading>
							{values.injurySustained &&
								questions.injury_details.map((question) => (
									<Box mb={8}>
										<InputField
											name={question.name}
											label={question.label}
											inputType={question.inputType}
											type={question.type}
											key={question.name}
											placeholder={question.placeholder}
										/>
									</Box>
								))}

							<Heading mt={20} mb={2} as="h3">
								Equipment Damage
							</Heading>

							{values.equipmentDamaged &&
								questions.equip_damage_details.map((question) => (
									<Box mb={8}>
										<InputField
											name={question.name}
											label={question.label}
											type={question.type}
											key={question.name}
											placeholder={question.placeholder}
										/>
									</Box>
								))}

							<Heading mt={20} mb={2} as="h3">
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
									/>
								</Box>
							))}

							<Flex mt={8}>
								<Button
									type="submit"
									isLoading={isSubmitting}
									bg="blue.600"
									color="white"
									margin="auto"
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
	injuryLocation: "",
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
};

export default CreatePost;
