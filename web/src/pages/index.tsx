import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";

import { useMeQuery, usePostsQuery } from "../generated/graphql";

const Index = () => {
	const { data, error, loading, fetchMore, variables } = usePostsQuery({
		variables: {
			limit: 15,
			cursor: null as null | string,
		},
		notifyOnNetworkStatusChange: true,
	});

	if (!loading && !data) {
		return (
			<div>
				<div>you got query failed for some reason</div>
				<div>{error?.message}</div>
			</div>
		);
	}

	console.log(data);

	return (
		<Layout>
			<Flex align="center">
				<Heading>Posts</Heading>
				<NextLink href="/create-post">
					<Button as={Link} ml="auto">
						create post
					</Button>
				</NextLink>
			</Flex>
			<br />
			{!data && loading ? (
				<div>loading...</div>
			) : (
				<Stack spacing={8}>
					{data!.posts.posts.map((p) =>
						!p ? null : (
							<Flex key={p.id} p={5} shadow="md">
								<Box flex={1}>
									<NextLink href="/post/[id]" as={`/post/${p.id}`}>
										<Link>
											<Heading fontSize="xl">{p.title}</Heading>
										</Link>
									</NextLink>
									<Text>posted by {p.creator.username}</Text>
									<Flex align="center">
										<Text mt={4}>{p.textSnippet}</Text>
										<Box ml="auto">
											<EditDeletePostButtons
												id={p.id}
												creatorId={p.creator.id}
											/>
										</Box>
									</Flex>
								</Box>
							</Flex>
						)
					)}
				</Stack>
			)}
			{data && data.posts.hasMore ? (
				<Flex>
					<Button
						onClick={() => {
							fetchMore({
								variables: {
									limit: variables?.limit,
									cursor:
										data.posts.posts[data.posts.posts.length - 1].createdAt,
								},
							});
						}}
						isLoading={loading}
						m="auto"
						my={8}
					>
						load more
					</Button>
				</Flex>
			) : null}
		</Layout>
	);
};

export default Index;
