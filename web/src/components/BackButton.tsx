import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export const BackButton: React.FC = () => {
	const router = useRouter();
	return (
		<Button ml={4} onClick={() => router.back()} rightIcon={<ArrowBackIcon />}>
			Back
		</Button>
	);
};
