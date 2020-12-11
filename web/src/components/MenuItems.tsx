import { Link, Text } from "@chakra-ui/react";
import React from "react";

const MenuItems: React.FC<any> = (props) => {
	const { children, ...rest } = props;

	return (
		<Text mb={{ base: 8, md: 0 }} mr={{ base: 0, md: 8 }} {...rest}>
			{children}
		</Text>
	);
};

export default MenuItems;
