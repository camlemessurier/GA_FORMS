import { Link, Text } from "@chakra-ui/react";
import React from "react";

const MenuItems: React.FC<any> = (props) => {
	const { children, ...rest } = props;

	return (
		<Text
			mb={{ base: 8, sm: 0 }}
			mr={{ base: 0, sm: 8 }}
			display="block"
			{...rest}
		>
			<Link>{children}</Link>
		</Text>
	);
};

export default MenuItems;
