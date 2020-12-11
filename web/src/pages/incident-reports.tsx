import { AddIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Link,
	Skeleton,
	SkeletonText,
	Stack,
	Tag,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { EditDeleteReportButtons } from "../components/EditDeleteReportButtons";
import { Layout } from "../components/Layout";
import ReportSkeletons from "../components/ReportSkeletons";
import { useIncidentReportsQuery } from "../generated/graphql";

const incidentReports = () => {
	const {
		data,
		error,
		loading,
		fetchMore,
		variables,
	} = useIncidentReportsQuery({
		variables: {
			limit: 15,
			cursor: null as null | string,
		},
		notifyOnNetworkStatusChange: true,
	});

	if (!loading && !data) {
		console.log(error);
		return (
			<Layout>
				<Heading>Error</Heading>
				<Text>{error?.message}</Text>
			</Layout>
		);
	}

	return (
		<Layout>
			<Flex align="center">
				<Heading size="lg" color="blue.600">
					Incident Reports
				</Heading>

				<NextLink href="/create-incident-report">
					<Button
						colorScheme="blue"
						bg="blue.400"
						leftIcon={<AddIcon mb={0} />}
						ml="auto"
					>
						New
					</Button>
				</NextLink>
			</Flex>

			<Divider mt={2} />
			<br />
			{!data && loading ? (
				<ReportSkeletons />
			) : (
				<Stack spacing={8}>
					{data?.incidentReports?.incidentReports.length === 0 ? (
						<Box borderRadius="lg" color="grey">
							{" "}
							No reports to show
						</Box>
					) : (
						data!.incidentReports.incidentReports.map((p) =>
							!p ? null : (
								<Flex key={p.id} p={5} shadow="md">
									<Box flex={1}>
										<Flex justify="space-between">
											<NextLink
												href="/incident-report/[id]"
												as={`/incident-report/${p.id}`}
											>
												<Link>
													<Heading fontSize="xl">{p.title}</Heading>
												</Link>
											</NextLink>
											{p.isReviewed === "Yes" ? (
												<Tag variant="solid" colorScheme="green">
													Reviewed
												</Tag>
											) : (
												<Tag variant="solid" colorScheme="red">
													Not Reviewed
												</Tag>
											)}
										</Flex>
										<Text>posted by {p.creator.username}</Text>

										<Flex align="center">
											<Text mt={4}>{p.textSnippet}</Text>
											<Box ml="auto">
												<EditDeleteReportButtons
													id={p.id}
													creatorId={p.creator.id}
												/>
											</Box>
										</Flex>
									</Box>
								</Flex>
							)
						)
					)}
				</Stack>
			)}
			{data && data.incidentReports.hasMore ? (
				<Flex>
					<Button
						onClick={() => {
							fetchMore({
								variables: {
									limit: variables?.limit,
									cursor:
										data.incidentReports.incidentReports[
											data.incidentReports.incidentReports.length - 1
										].createdAt,
								},
							});
						}}
						isLoading={loading}
						m="auto"
						my={8}
					>
						load more
					</Button>
				</Flex>
			) : null}
		</Layout>
	);
};

export default incidentReports;
