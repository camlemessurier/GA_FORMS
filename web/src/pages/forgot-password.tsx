import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
	const [forgotPassword] = useForgotPasswordMutation();
	const [completed, setCompleted] = useState(false);
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ email: "" }}
				onSubmit={async (values, { setErrors }) => {
					await forgotPassword({ variables: values });
					setCompleted(true);
				}}
			>
				{({ isSubmitting }) =>
					completed ? (
						<Box>If an account exists, we sent you email</Box>
					) : (
						<>
							<Form>
								<InputField
									name="email"
									label="email"
									placeholder="email"
									type="email"
								/>

								<Button
									mt={4}
									type="submit"
									isLoading={isSubmitting}
									colorScheme="teal"
								>
									Send Link to Email
								</Button>
							</Form>
						</>
					)
				}
			</Formik>
		</Wrapper>
	);
};

export default ForgotPassword;
