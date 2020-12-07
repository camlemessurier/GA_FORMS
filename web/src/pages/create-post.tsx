import { Box, Button, Flex } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
	const [createPost] = useCreatePostMutation();
	const router = useRouter();
	useIsAuth();
	return (
		<Layout variant="small">
			<Formik
				initialValues={{ title: "", text: "" }}
				onSubmit={async (values) => {
					console.log(values);
					const { errors } = await createPost({
						variables: { input: values },
						update: (cache) => {
							cache.evict({ fieldName: "posts:{}" });
						},
					});
					if (!errors) {
						//router.push("/");
					}
				}}
			>
				{({ isSubmitting, values }) => (
					<>
						<Form>
							<Box>
								<InputField name="title" label="title" placeholder="title" />
							</Box>
							<Box mt={4}>
								<InputField
									inputType="textarea"
									name="text"
									label="text"
									placeholder="text..."
								/>
							</Box>
							<Box mt={4}>
								<InputField inputType="radio" name="hello" label="hello" />
							</Box>

							<Flex mt={8}>
								<Button
									type="submit"
									isLoading={isSubmitting}
									colorScheme="teal"
									margin="auto"
								>
									Post
								</Button>
							</Flex>
						</Form>
					</>
				)}
			</Formik>
		</Layout>
	);
};

export default CreatePost;
