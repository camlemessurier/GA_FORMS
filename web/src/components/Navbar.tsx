import { Box, Flex, Heading, Link, Button } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import MenuItems from "./MenuItems";
import UserState from "./UserState";

export const Navbar: React.FC = (props) => {
	const [show, setShow] = React.useState(false);
	const toggleMenu = () => setShow(!show);

	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			pl={{ base: 4, md: 6 }}
			pr={6}
			pb={{ base: 6, md: 1 }}
			pt={{ base: 6, md: 1 }}
			bg={"blue.500"}
			color={"white"}
			{...props}
		>
			<NextLink href="/">
				<Flex
					m={2}
					as={Button}
					p={{ base: 0, md: 8 }}
					bg="inherit"
					color="inherit"
					_hover={{ bg: "blue.300" }}
				>
					<Heading as="h1" size="md">
						GA Forms
					</Heading>
				</Flex>
			</NextLink>
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
					<MenuItems
						as={Button}
						p={6}
						bg="inherit"
						color="inherit"
						_hover={{ bg: "blue.300" }}
					>
						Incident Reports
					</MenuItems>
				</NextLink>
			</Box>
			<Box
				display={{ base: show ? "block" : "none", md: "block" }}
				mt={{ base: 4, md: 0 }}
				textAlign="left"
			>
				<UserState />
			</Box>
		</Flex>
	);
};
