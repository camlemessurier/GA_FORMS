import NextLink from "next/link";
import { Box, Button, Link } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import login from "../login";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage = () => {
	const [, changePassword] = useChangePasswordMutation();
	const router = useRouter();
	const [tokenError, setTokenError] = useState("");
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ newPassword: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await changePassword({
						newPassword: values.newPassword,
						token:
							typeof router.query.token === "string" ? router.query.token : "",
					});
					if (response.data?.changePassword.errors) {
						const errorMap = toErrorMap(response.data.changePassword.errors);
						if ("token" in errorMap) {
							setTokenError(errorMap.token);
						}
						setErrors(errorMap);
					} else if (response.data?.changePassword.user) {
						router.push("/");
					}
				}}
			>
				{({ isSubmitting }) => (
					<>
						<Form>
							<InputField
								name="newPassword"
								label="New Password"
								placeholder="New Password"
								type="password"
							/>
							<Button
								mt={4}
								type="submit"
								isLoading={isSubmitting}
								colorScheme="teal"
							>
								Change Password
							</Button>
						</Form>
						{tokenError && (
							<Box>
								<Box color="red">{tokenError}</Box>
								<NextLink href="/forgot-password">
									<Link>Go forget again</Link>
								</NextLink>
							</Box>
						)}
					</>
				)}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
