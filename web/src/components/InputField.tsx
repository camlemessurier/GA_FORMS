import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useField } from "formik";
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
	Radio,
	RadioGroup,
	Stack,
	useRadioGroup,
	HStack,
	useRadio,
	Box,
} from "@chakra-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
	TextareaHTMLAttributes<HTMLTextAreaElement> & {
		name: string;
		label?: string;
		inputType?: string;
		placeholder?: string;
		required?: boolean;
	};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	inputType,
	size,
	required,
	...props
}) => {
	const [field, { error, touched }, helpers] = useField(props);

	if (inputType === "textarea") {
		return (
			<FormControl isInvalid={!!error} isRequired={required}>
				<FormLabel htmlFor={field.name}>{label}</FormLabel>
				<Textarea {...field} {...props} id={field.name} />
				{error ? (
					<FormErrorMessage mt={2} color="red.500">
						{touched && error}
					</FormErrorMessage>
				) : null}
			</FormControl>
		);
	}

	if (inputType === "radio") {
		const { getRootProps, getRadioProps } = useRadioGroup({
			name: props.name,
			onChange: helpers.setValue,
		});

		const group = getRootProps();

		const options = ["Yes", "No"];
		return (
			<FormControl isInvalid={!!error} isRequired={required}>
				<FormLabel htmlFor={field.name}>{label}</FormLabel>
				<HStack {...group} justify="center" mt={4}>
					{options.map((value: string) => {
						const radio = getRadioProps({ value });
						return (
							<RadioSingle key={value} {...radio}>
								{value}
							</RadioSingle>
						);
					})}
				</HStack>
				{error ? (
					<FormErrorMessage mt={2} color="red.500">
						{touched && error}
					</FormErrorMessage>
				) : null}
			</FormControl>
		);
	}

	return (
		<FormControl isInvalid={!!error} isRequired={required}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Input {...field} {...props} id={field.name} />
			{error ? (
				<FormErrorMessage mt={2} color="red.500">
					{touched && error}
				</FormErrorMessage>
			) : null}
		</FormControl>
	);
};

const RadioSingle: React.FC<any> = (props) => {
	const { getInputProps, getCheckboxProps } = useRadio(props);
	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as="label">
			<input {...input} />
			<Box
				{...checkbox}
				cursor="pointer"
				borderRadius="md"
				boxShadow="md"
				_checked={{
					bg: "blue.700",
					color: "white",
					borderColor: "blue.700",
				}}
				_focus={{
					boxShadow: "outline",
				}}
				px={20}
				py={3}
			>
				{props.children}
			</Box>
		</Box>
	);
};
