import { Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import LinkButton from "./LinkButton";
import { useApolloClient } from "@apollo/client";

const UserState = () => {
	const [logout, { loading: logoutFetching }] = useLogoutMutation();
	const { data, loading } = useMeQuery();
	const apolloClient = useApolloClient();

	if (!!data?.me) {
		return (
			<>
				<Flex>
					<Flex mr={5} alignItems="center">
						{data?.me?.username || ""}
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
			</>
		);
	} else {
		return (
			<>
				<LinkButton to="/login">Login</LinkButton>
				<LinkButton to="/register">Register</LinkButton>
			</>
		);
	}
};

export default UserState;
