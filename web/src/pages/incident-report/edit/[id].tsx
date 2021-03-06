import { Box, Button, Text, Flex, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
	useIncidentReportQuery,
	useUpdateIncidentReportMutation,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../utils/useIsAuth";
import questions from "../../../questions";
import * as Yup from "yup";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditIncidentReport: React.FC = () => {
	const router = useRouter();
	useIsAuth();

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

	const intId = useGetIntId();
	const { data, loading } = useIncidentReportQuery({
		skip: intId === -1,
		variables: {
			id: intId,
		},
	});
	const [updateReport] = useUpdateIncidentReportMutation();

	if (loading) {
		return (
			<Layout>
				<div>loading</div>
			</Layout>
		);
	}

	if (!data?.IncidentReport) {
		return (
			<Layout>
				<div>could no find post</div>
			</Layout>
		);
	}

	const {
		__typename,
		id,
		creator,
		createdAt,
		reviewer,
		reviewDate,
		...incidentReportsInitialValues
	} = data.IncidentReport;

	return (
		<Layout variant="small">
			<Formik
				initialValues={incidentReportsInitialValues}
				validationSchema={IncidentReportSchema}
				enableReinitialize
				onSubmit={async (values) => {
					const { errors } = await updateReport({
						variables: { input: values, id: intId },
						update: (cache) => {
							cache.reset();
						},
					});
					console.log(errors);
					if (!errors) {
						router.push("/incident-reports");
					}
				}}
			>
				{({ isSubmitting, values, errors }) => (
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
										required={question.required}
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
										required={question.required}
									/>
								</Box>
							))}

							<Heading mt={20} mb={2} as="h3">
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
								<Box>No injury sustained</Box>
							)}

							<Heading mt={20} mb={2} as="h3">
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
								<Box>No Equipment Damaged</Box>
							)}

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
										required={question.required}
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

export default EditIncidentReport;
