import React from "react";
import { Form, Formik } from "formik";
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Box,
	Button,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";

interface registerProps {}

const REGISTER_MUTATION = `
mutation Register($username: String!, $password:String!){
  register(options: {username:$username, password: $password}){
    errors{
      field
      message
    }
    user{
      id
      username
    }
  }
}`;

const Register: React.FC<registerProps> = ({}) => {
	const [, register] = useMutation(REGISTER_MUTATION);
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={async (values) => {
					const response = await register(values);
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
