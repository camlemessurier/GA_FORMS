import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Link,
	Stack,
	Text,
} from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../components/Layout";

const Index = () => {
	return (
		<Layout>
			<Flex align="center">
				<Heading>Home</Heading>
			</Flex>
			<Divider />

			<br />
			<br />

			<NextLink href="/posts">
				<Button size="lg" as={Link} ml="auto" color="blue.800">
					Posts
				</Button>
			</NextLink>
			<br />
			<br />
			<NextLink href="/incidentReports">
				<Button size="lg" as={Link} ml="auto" color="blue.800">
					IncidentReports
				</Button>
			</NextLink>
		</Layout>
	);
};

export default Index;
