import { Box, IconButton, Link } from "@chakra-ui/core";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeletePostButtonsProps {
	id: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
	id,
}) => {
	const [deletePost] = useDeletePostMutation();
	return (
		<Box>
			<NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
				<IconButton
					as={Link}
					mr={4}
					icon={<EditIcon />}
					aria-label="edit post"
				/>
			</NextLink>
			<IconButton
				icon={<DeleteIcon />}
				aria-label="delete post"
				onClick={() => {
					deletePost({ variables: { id } });
				}}
			/>
		</Box>
	);
};
