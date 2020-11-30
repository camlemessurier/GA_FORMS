import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
	useDeletePostMutation,
	useMeQuery,
	usePostsQuery,
} from "../generated/graphql";
import { Layout } from "../components/Layout";
import {
	Link,
	Stack,
	Box,
	Heading,
	Text,
	Flex,
	Button,
	Icon,
	IconButton,
} from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	DeleteIcon,
	EditIcon,
} from "@chakra-ui/icons";
import { UpdootSection } from "../components/UpdootSection";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";

const Index = () => {
	const [variables, setVariables] = useState({
		limit: 15,
		cursor: null as null | string,
	});

	const [{ data, error, fetching }] = usePostsQuery({
		variables,
	});

	const [{ data: meData }] = useMeQuery();

	if (!fetching && !data) {
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
			{!data && fetching ? (
				<div>loading...</div>
			) : (
				<Stack spacing={8}>
					{data!.posts.posts.map((p) =>
						!p ? null : (
							<Flex key={p.id} p={5} shadow="md">
								<UpdootSection post={p} />
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
											{meData?.me?.id !== p.creator.id ? null : (
												<EditDeletePostButtons id={p.id} />
											)}
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
							setVariables({
								limit: variables.limit,
								cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
							});
						}}
						isLoading={fetching}
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
