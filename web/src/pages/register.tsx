import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Register: React.FC = () => {
	const router = useRouter();
	const [register] = useRegisterMutation();
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: "", email: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register({
						variables: { options: values },
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: "Query",
									me: data?.register.user,
								},
							});
						},
					});
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
						router.back();
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name="username"
							label="Username"
							placeholder="Username"
						/>
						<Box mt={4}>
							<InputField name="email" label="Email" placeholder="Email" />
						</Box>
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
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
