import React from "react";
import { Form, Formik } from "formik";
import {
	Box,
	Button,
	Link,
	Flex,
	FormControl,
	Heading,
} from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";

const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [login] = useLoginMutation();

	return (
		<Layout variant="small">
			<br />
			<Heading color="blue.600" textAlign="center" as="h1" size="lg">
				Login
			</Heading>
			<br />
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
								label="Username"
								placeholder="Username"
							/>
							<Box mt={4}>
								<InputField
									name="password"
									label="Password"
									placeholder="Password"
									type="password"
								/>
							</Box>

							<br />

							<Flex justify="center">
								<Button
									mt={4}
									type="submit"
									isLoading={isSubmitting}
									bg="blue.600"
									size="md"
									color="white"
								>
									Login
								</Button>
							</Flex>
						</Form>
					</>
				)}
			</Formik>
		</Layout>
	);
};

export default Login;
