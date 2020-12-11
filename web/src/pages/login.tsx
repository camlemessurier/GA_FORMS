import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Link, Flex, FormControl } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";

const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [login] = useLoginMutation();

	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ usernameOrEmail: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await login({
						variables: values,
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: "Query",
									me: data?.login.user,
								},
							});
							cache.evict({ fieldName: "posts:{}" });
						},
					});
					if (response.data?.login.errors) {
						setErrors(toErrorMap(response.data.login.errors));
					} else if (response.data?.login.user) {
						router.back();
					}
				}}
			>
				{({ isSubmitting }) => (
					<>
						<Form>
							<InputField
								name="usernameOrEmail"
								label="Username or Email"
								placeholder="Username or Email"
							/>
							<Box mt={4}>
								<InputField
									name="password"
									label="password"
									placeholder="password"
									type="password"
								/>
							</Box>

							<Button
								mt={4}
								type="submit"
								isLoading={isSubmitting}
								colorScheme="teal"
							>
								Login
							</Button>
						</Form>
					</>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Login;
