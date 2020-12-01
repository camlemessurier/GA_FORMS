import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";
import login from "./login";

const CreatePost: React.FC<{}> = ({}) => {
	const [, createPost] = useCreatePostMutation();
	const router = useRouter();
	useIsAuth();
	return (
		
		
		
	);
};

export default withUrqlClient(createUrqlClient)(CreatePost);
