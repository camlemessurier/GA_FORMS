import { Box, Button } from "@chakra-ui/core";
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
					const { errors } = await createPost({
						variables: { input: values },
						update: (cache) => {
							cache.evict({ fieldName: "posts:{}" });
						},
					});
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
									type="textarea"
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
