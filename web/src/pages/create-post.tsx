import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";
import login from "./login";

const CreatePost: React.FC<{}> = ({}) => {
	const [createPost] = useCreatePostMutation();
	const router = useRouter();
	useIsAuth();
	return (
		<Layout variant="small">
			<Formik
				initialValues={{ title: "", text: "" }}
				onSubmit={async (values) => {
					const { errors } = await createPost({ variables: { input: values } });
					if (!errors) {
						router.push("/");
					}
				}}
			>
				{({ isSubmitting }) => (
					<>
						<Form>
							<InputField name="title" label="title" placeholder="title" />
							<Box mt={4}>
								<InputField
									textarea
									name="text"
									label="text"
									placeholder="text..."
								/>
							</Box>

							<Button
								mt={4}
								type="submit"
								isLoading={isSubmitting}
								colorScheme="teal"
							>
								Post
							</Button>
						</Form>
					</>
				)}
			</Formik>
		</Layout>
	);
};

export default CreatePost;
