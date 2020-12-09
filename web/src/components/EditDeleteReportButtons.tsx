import React, { useState, useRef } from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	IconButton,
	Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
	useDeleteIncidentReportMutation,
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
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const { data: meData } = useMeQuery();
	const [deleteIncidentReport] = useDeleteIncidentReportMutation();

	if (meData?.me?.id !== creatorId) {
		return null;
	}

	return (
		<Box>
			<NextLink
				href="/incident-report/edit/[id]"
				as={`/incident-report/edit/${id}`}
			>
				<IconButton
					as={Link}
					mr={4}
					icon={<EditIcon />}
					aria-label="Edit Report"
				/>
			</NextLink>

			<IconButton
				icon={<DeleteIcon />}
				aria-label="Delete Post"
				onClick={() => setIsOpen(true)}
			/>
			<AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Incident Report
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={() => setIsOpen(false)}>Cancel</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									deleteIncidentReport({
										variables: { id },
										update: (cache) => {
											cache.evict({ id: "IncidentReport:" + id });
										},
									});
									router.push("/incident-reports");
								}}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	);
};
