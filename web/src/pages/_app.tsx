import { ApolloProvider, getApolloContext } from "@apollo/client";
import { CSSReset, ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import apolloClient from "../utils/apolloClient";

function MyApp({ Component, pageProps }: any) {
	return (
		<>
			<Head>
				<title>GA Forms</title>
			</Head>
			<ApolloProvider client={apolloClient}>
				<ChakraProvider theme={theme}>
					<CSSReset />
					<Component {...pageProps} />
				</ChakraProvider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
