import {
	Box,
	Button,
	Flex,
	Heading,
	Link,
	Skeleton,
	SkeletonText,
	Stack,
	Text,
} from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { EditDeleteReportButtons } from "../components/EditDeleteReportButtons";
import { Layout } from "../components/Layout";
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
				<Heading>Incident Reports</Heading>
				<NextLink href="/create-incident-report">
					<Button as={Link} ml="auto">
						New
					</Button>
				</NextLink>
			</Flex>
			<br />
			{!data && loading ? (
				<>
					<Box padding="6" boxShadow="lg" bg="white" mb={2}>
						<Skeleton height="20px" />
						<SkeletonText mt="4" noOfLines={2} spacing="4" />
					</Box>
					<Box padding="6" boxShadow="lg" bg="white" mb={2}>
						<Skeleton height="20px" />
						<SkeletonText mt="4" noOfLines={4} spacing="4" />
					</Box>
					<Box padding="6" boxShadow="lg" bg="white" mb={2}>
						<Skeleton height="20px" />
						<SkeletonText mt="4" noOfLines={4} spacing="4" />
					</Box>
				</>
			) : (
				<Stack spacing={8}>
					{data?.incidentReports?.incidentReports.length === 0 && (
						<Box borderRadius="lg" color="grey">
							{" "}
							No reports to show
						</Box>
					)}
					{data!.incidentReports.incidentReports.map((p) =>
						!p ? null : (
							<Flex key={p.id} p={5} shadow="md">
								<Box flex={1}>
									<NextLink href="/post/[id]" as={`/post/${p.id}`}>
										<Link>
											<Heading fontSize="xl">{p.title}</Heading>
										</Link>
									</NextLink>
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
