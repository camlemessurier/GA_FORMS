import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
	if (options.username.length <= 2) {
		return [
			{
				field: "username",
				message: "username is not long enough",
			},
		];
	}
	if (options.username.includes("@")) {
		return [
			{
				field: "username",
				message: "Cannot include symbols",
			},
		];
	}
	if (!options.email.includes("@")) {
		return [
			{
				field: "email",
				message: "invalid email",
			},
		];
	}

	if (options.password.length <= 2) {
		return [
			{
				field: "password",
				message: "password not long enough",
			},
		];
	}
	return null;
};
