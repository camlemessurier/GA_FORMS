import React, { useState } from "react";
import { Box, IconButton, Link, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import {
	useMeQuery,
	useReviewIncidentReportMutation,
} from "../generated/graphql";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface ReviewReportProps {
	id: number;
	creatorId: number;
	isReviewed: String;
}

export const ReviewButton: React.FC<ReviewReportProps> = ({
	id,
	creatorId,
	isReviewed,
}) => {
	const router = useRouter();
	const { data } = useMeQuery();
	const [
		reviewIncidentReport,
		{ error, loading },
	] = useReviewIncidentReportMutation();
	const toast = useToast();
	const [showButton, setShowButton] = useState(true);

	if (!showButton) {
		return null;
	}

	if (isReviewed === "Yes") {
		setShowButton(false);
	}

	if (!data?.me) {
		setShowButton(false);
	}

	if (data?.me?.id === creatorId) {
		setShowButton(false);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<Box>
			<IconButton
				icon={<CheckIcon />}
				aria-label="Delete Post"
				onClick={() => {
					reviewIncidentReport({
						variables: { id, username: data!.me!.username },
						update: (cache: any) => {
							cache.reset(); //cheating, but quick and dirty
						},
					});
					setShowButton(false);
					toast({
						title: "Report Reviewed",
						status: "success",
						duration: 3000,
						isClosable: false,
					});
				}}
				isLoading={loading}
			/>
		</Box>
	);
};
