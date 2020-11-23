import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { title } from "process";

const Index = () => {
	const [variables, setVariables] = useState({
		limit: 10,
		cursor: null as null | string,
	});
	const [{ data, fetching }] = usePostsQuery({
		variables,
	});
	if (!fetching && !data) {
		return <div>Query failed for some reason</div>;
	}

	return (
		<Layout>
			<Flex align="center">
				<Heading>Reddit</Heading>
				<NextLink href="/create-post">
					<Link ml="auto ">Create Post</Link>
				</NextLink>
			</Flex>
			<br />
			{fetching && !data ? (
				<div>Loading...</div>
			) : (
				<Stack spacing={8}>
					{data!.posts.posts.map((p) => (
						<Box p={5} shadow="md" key={p.id}>
							<Heading fontSize="xl">{p.title}</Heading>
							<Text mt={4}>{p.textSnippet}</Text>
						</Box>
					))}
				</Stack>
			)}

			{data && data.posts.hasMore ? (
				<Flex>
					<Button
						onClick={() => {
							setVariables({
								limit: variables.limit,
								cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
							});
						}}
						isLoading={fetching}
						m="auto"
						my={8}
					>
						Load More
					</Button>
				</Flex>
			) : null}
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
