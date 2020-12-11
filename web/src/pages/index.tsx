import {
	Box,
	Button,
	Center,
	Divider,
	Flex,
	Heading,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../components/Layout";

const Index = () => {
	return (
		<Layout>
			<Heading color="blue.700">Home</Heading>

			<Divider />

			<br />
			<Center>
				<NextLink href="/incident-reports">
					<Flex
						size="lg"
						as={Button}
						w="100%"
						color="white"
						bg="blue.400"
						p={20}
					>
						<Heading size="lg">Incident Reports</Heading>
					</Flex>
				</NextLink>
			</Center>
		</Layout>
	);
};

export default Index;
