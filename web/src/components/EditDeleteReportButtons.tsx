import React from "react";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import {
	useDeleteIncidentReportMutation,
	useDeletePostMutation,
	useMeQuery,
} from "../generated/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface EditDeleteReportButtonsProps {
	id: number;
	creatorId: number;
}

export const EditDeleteReportButtons: React.FC<EditDeleteReportButtonsProps> = ({
	id,
	creatorId,
}) => {
	const router = useRouter();
	const { data: meData } = useMeQuery();
	const [deleteIncidentReport] = useDeleteIncidentReportMutation();

	if (meData?.me?.id !== creatorId) {
		return null;
	}

	return (
		<Box>
			<NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
				<IconButton
					as={Link}
					mr={4}
					icon={<EditIcon />}
					aria-label="Edit Post"
				/>
			</NextLink>
			<IconButton
				icon={<DeleteIcon />}
				aria-label="Delete Post"
				onClick={() => {
					deleteIncidentReport({
						variables: { id },
						update: (cache) => {
							cache.evict({ id: "IncidentReport:" + id });
						},
					});
					router.push("/incidentReports");
				}}
			/>
		</Box>
	);
};
