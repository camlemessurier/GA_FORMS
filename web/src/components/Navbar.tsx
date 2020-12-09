import {
	Box,
	Button,
	Text,
	Flex,
	Heading,
	Link,
	Spinner,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import MenuItems from "./MenuItems";
import LinkButton from "./LinkButton";

export const Navbar: React.FC = (props) => {
	const [show, setShow] = React.useState(false);
	const toggleMenu = () => setShow(!show);

	const [logout, { loading: logoutFetching }] = useLogoutMutation();
	const apolloClient = useApolloClient();
	const { data, loading } = useMeQuery();
	let body = null;

	if (loading) {
		<Spinner color="blue.600" />;
	} else if (!data?.me) {
		body = (
			<>
				<LinkButton to="/login">Login</LinkButton>
				<LinkButton to="/signup">Sign Up</LinkButton>
			</>
		);
	} else {
		body = (
			<Flex>
				<Flex mr={5} alignItems="center">
					{data.me.username}
				</Flex>
				<Button
					isLoading={logoutFetching}
					color={"white"}
					bg={"blue.500"}
					_hover={{
						bg: "blue.400",
					}}
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
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			p={6}
			bg={"blue.500"}
			color={"white"}
			{...props}
		>
			<Flex mr={8}>
				<Heading as="h1" size="md">
					GA Forms
				</Heading>
			</Flex>
			<Box display={{ base: "block", md: "none" }} p={2} onClick={toggleMenu}>
				{show ? <CloseIcon /> : <HamburgerIcon w={6} h={6} />}
			</Box>

			<Box
				display={{ base: show ? "block" : "none", md: "flex" }}
				width={{ base: "full", md: "auto" }}
				align="center"
				flexGrow={1}
			>
				<NextLink href="/incident-reports">
					<MenuItems>Incident Reports</MenuItems>
				</NextLink>
			</Box>
			<Box
				display={{ base: show ? "block" : "none", md: "block" }}
				mt={{ base: 4, md: 0 }}
				textAlign="left"
			>
				{body}
			</Box>
		</Flex>
	);
};
