import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	const router = useRouter();
	const [logout, { loading: logoutFetching }] = useLogoutMutation();
	const apolloClient = useApolloClient();
	const { data, loading } = useMeQuery({
		skip: isServer(),
	});
	let body = null;

	if (loading) {
	} else if (!data?.me) {
		body = (
			<>
				<NextLink href="/login">
					<Link color="white" mr={2}>
						Login
					</Link>
				</NextLink>
				<NextLink href="/register">
					<Link color="white">Register</Link>
				</NextLink>
			</>
		);
	} else {
		body = (
			<Flex>
				<Box mr={5}>{data.me.username}</Box>
				<Button
					color="white"
					variant="link"
					isLoading={logoutFetching}
					onClick={async () => {
						await logout();
						await apolloClient.resetStore();
					}}
				>
					Logout
				</Button>
			</Flex>
		);
	}

	return (
		<Flex position="sticky" top={0} zIndex={1} bg="blue.400" p={4}>
			<Flex flex={1} margin="auto" align="center">
				<NextLink href="/">
					<Link color="white">
						<Heading> Global Acoustics: Forms</Heading>
					</Link>
				</NextLink>
				<Box ml={"auto"} color="white">
					{body}
				</Box>
			</Flex>
		</Flex>
	);
};
