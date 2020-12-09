import { Button } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

const LinkButton = (props: any) => {
	return (
		<Button
			color={"white"}
			bg={"blue.500"}
			_hover={{
				bg: "blue.400",
			}}
			{...props}
		>
			<NextLink href={props.to}>{props.children}</NextLink>
		</Button>
	);
};

export default LinkButton;
