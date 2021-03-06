import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
	Heading,
	Spacer,
	Text,
	SkeletonCircle,
	SkeletonText,
} from "@chakra-ui/react";
import React from "react";
import { BackButton } from "../../components/BackButton";
import { EditDeleteReportButtons } from "../../components/EditDeleteReportButtons";
import { Layout } from "../../components/Layout";
import { ReviewButton } from "../../components/ReviewButton";
import { useGetReportFromUrl } from "../../utils/useGetReportFromUrl";

const IncidentReport = ({}) => {
	const { data, loading, error } = useGetReportFromUrl();

	if (loading) {
		return (
			<Layout>
				<Box padding="6" boxShadow="lg" bg="white">
					<SkeletonCircle size="10" />
					<SkeletonText mt="4" noOfLines={10} spacing="4" />
				</Box>
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout>
				<div>Error: {error.message}</div>
			</Layout>
		);
	}

	if (!data?.IncidentReport) {
		return (
			<Layout>
				<Box>could not find post</Box>
			</Layout>
		);
	}

	const date = new Date(data.IncidentReport.createdAt)
		.toLocaleString()
		.slice(0, 16);

	return (
		<Layout>
			<Flex>
				<Heading color="blue.600" mb={4}>
					{data?.IncidentReport?.title}
				</Heading>
				<Spacer />
				<Box display="flex">
					<EditDeleteReportButtons
						id={data.IncidentReport.id}
						creatorId={data.IncidentReport.creator.id}
					/>
					<ReviewButton
						id={data.IncidentReport.id}
						creatorId={data.IncidentReport.creator.id}
						isReviewed={data.IncidentReport.isReviewed!}
					/>
					<BackButton />
				</Box>
			</Flex>

			<Text color="grey">{date}</Text>
			<Text color="grey">{data?.IncidentReport.creator.username}</Text>
			<br />
			<Box mb={8}>
				<Accordion allowToggle allowMultiple>
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								<Heading as="h3" size="md" color="blue.500">
									Incident Details
								</Heading>
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<table width="100%">
								<tbody>
									<tr>
										<td>Incident Time</td>
										<td>{data?.IncidentReport?.incidentDatetime}</td>
									</tr>
									<tr>
										<td>Incident Location</td>
										<td>{data?.IncidentReport?.incidentLocation}</td>
									</tr>
									<tr>
										<td>Incident Details</td>
										<td>{data?.IncidentReport?.incidentDetails}</td>
									</tr>
									<tr>
										<td>Incident Witnesses</td>
										<td>{data?.IncidentReport?.incidentWitnesses}</td>
									</tr>
									<tr>
										<td>Injury sustained</td>
										<td>{data?.IncidentReport?.injurySustained}</td>
									</tr>
									<tr>
										<td>Equipment damaged</td>
										<td>{data?.IncidentReport?.equipmentDamaged}</td>
									</tr>
								</tbody>
							</table>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								<Heading as="h3" size="md" color="blue.500">
									Safety Checks
								</Heading>
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<table width="100%">
								<tbody>
									<tr>
										<td>Take 5 completed</td>
										<td>{data?.IncidentReport?.take5Completed}</td>
									</tr>
									<tr>
										<td>SWMS completed</td>
										<td>{data?.IncidentReport?.SWMScompleted}</td>
									</tr>
									<tr>
										<td>Fatigue plan completed</td>
										<td>{data?.IncidentReport?.fatiguePlanCompleted}</td>
									</tr>
									<tr>
										<td>Site specific Procedures followed</td>
										<td>{data?.IncidentReport?.siteProceduresFollowed}</td>
									</tr>
								</tbody>
							</table>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								<Heading as="h3" size="md" color="blue.500">
									Injury Details
								</Heading>
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							{data?.IncidentReport?.injurySustained === "Yes" ? (
								<table width="100%">
									<tbody>
										<tr>
											<td>Injury Nature</td>
											<td>{data?.IncidentReport?.injuryNature}</td>
										</tr>
										<tr>
											<td>Injury agency</td>
											<td>{data?.IncidentReport?.injuryAgency}</td>
										</tr>
										<tr>
											<td>Person stopped work</td>
											<td>{data?.IncidentReport?.stoppedWork}</td>
										</tr>
										<tr>
											<td>Treatment received</td>
											<td>{data?.IncidentReport?.treatmentRecieved}</td>
										</tr>
										<tr>
											<td>Treatment details</td>
											<td>{data?.IncidentReport?.treatmentDetails}</td>
										</tr>
									</tbody>
								</table>
							) : (
								<Text color="grey">No injury sustained.</Text>
							)}
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								<Heading color="blue.500" as="h3" size="md">
									Equipment Damage
								</Heading>
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							{data?.IncidentReport?.equipmentDamaged === "Yes" ? (
								<table width="100%">
									<tbody>
										<tr>
											<td>Equipment Company</td>
											<td>{data?.IncidentReport?.equipmentCompany}</td>
										</tr>
										<tr>
											<td>Equipment Item/s</td>
											<td>{data?.IncidentReport?.equipmentItem}</td>
										</tr>
										<tr>
											<td>Damage Details</td>
											<td>{data?.IncidentReport?.damageDetails}</td>
										</tr>
									</tbody>
								</table>
							) : (
								<Text color="grey">No equipment damaged.</Text>
							)}
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								<Heading color="blue.500" as="h3" size="md">
									Incident Investigation
								</Heading>
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<table width="100%">
								<tbody>
									<tr>
										<td>Causal Factors</td>
										<td>{data?.IncidentReport?.causalFactors}</td>
									</tr>
									<tr>
										<td>Liklihood of recurrence</td>
										<td>{data?.IncidentReport?.recurrenceLiklihood}</td>
									</tr>
									<tr>
										<td>Outcome Severity</td>
										<td>{data?.IncidentReport?.outcomeSeverity}</td>
									</tr>
									<tr>
										<td>Resulting Risk</td>
										<td>{data?.IncidentReport?.resultingRisk}</td>
									</tr>
									<tr>
										<td>Actions taken to mitigate risk</td>
										<td>{data?.IncidentReport?.actionsTaken}</td>
									</tr>
									<tr>
										<td>Actions implemented on</td>
										<td>{data?.IncidentReport?.actionDate}</td>
									</tr>
									<tr>
										<td>Actions by</td>
										<td>{data?.IncidentReport?.actionPerson}</td>
									</tr>
								</tbody>
							</table>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								<Heading color="blue.500" as="h3" size="md">
									Review
								</Heading>
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							{data.IncidentReport.isReviewed === "Yes" ? (
								<table width="100%">
									<tbody>
										<tr>
											<td>Report reviewed by</td>
											<td>{data?.IncidentReport?.reviewer}</td>
										</tr>
										<tr>
											<td>On the </td>
											<td>{data?.IncidentReport?.reviewDate}</td>
										</tr>
									</tbody>
								</table>
							) : (
								<Text color="grey">Report not reviewed</Text>
							)}
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</Box>
			<br />
			<br />
			<br />
			<br />
		</Layout>
	);
};

export default IncidentReport;
