import { Box, Heading } from "@chakra-ui/core";
import { initDataState } from "@urql/exchange-graphcache/dist/types/store";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { useMeQuery, usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
	const { data, loading } = useGetPostFromUrl();
	const { data: meData } = useMeQuery();

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
			{meData?.me?.id !== data.post.creator.id ? null : (
				<EditDeletePostButtons id={data.post.id} />
			)}
		</Layout>
	);
};

export default Post;
