import { Box, Heading } from "@chakra-ui/core";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { useMeQuery } from "../../generated/graphql";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
	const { data, loading } = useGetPostFromUrl();

	if (loading) {
		return (
			<Layout>
				<div>Loading...</div>
			</Layout>
		);
	}

	if (!data?.post) {
		return (
			<Layout>
				<Box>could not find post</Box>
			</Layout>
		);
	}

	return (
		<Layout>
			<Heading mb={4}>{data?.post?.title}</Heading>
			<Box mb={8}>{data?.post?.text}</Box>
			<EditDeletePostButtons
				id={data.post.id}
				creatorId={data.post.creator.id}
			/>
		</Layout>
	);
};

export default Post;
