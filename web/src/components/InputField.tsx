import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
} from "@chakra-ui/core";

type InputFieldProps = {
	label: string;
	name: string;
	type?: string;
	placeholder?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	type,
	...props
}) => {
	const [field, { error }] = useField(props);

	if (type === "textarea") {
		return (
			<FormControl isInvalid={!!error}>
				<FormLabel htmlFor={field.name}>{label}</FormLabel>
				<Textarea {...field} {...props} id={field.name} />
				{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
			</FormControl>
		);
	}

	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Input {...field} {...props} id={field.name} />
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};
