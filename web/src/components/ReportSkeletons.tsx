import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const ReportSkeletons = () => {
	return (
		<>
			<Box padding="6" boxShadow="lg" bg="white" mb={2}>
				<Skeleton height="20px" />
				<SkeletonText mt="4" noOfLines={2} spacing="4" />
			</Box>
			<Box padding="6" boxShadow="lg" bg="white" mb={2}>
				<Skeleton height="20px" />
				<SkeletonText mt="4" noOfLines={2} spacing="4" />
			</Box>
			<Box padding="6" boxShadow="lg" bg="white" mb={2}>
				<Skeleton height="20px" />
				<SkeletonText mt="4" noOfLines={2} spacing="4" />
			</Box>
		</>
	);
};

export default ReportSkeletons;
