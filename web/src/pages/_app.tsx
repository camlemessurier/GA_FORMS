import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import theme from "../theme";
import { PaginatedPosts, PostsQuery } from "../generated/graphql";
import Head from "next/head";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	credentials: "include",
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					posts: {
						keyArgs: [],
						merge(
							existing: PaginatedPosts | undefined,
							incoming: PaginatedPosts
						) {
							return {
								...incoming,
								posts: [...(existing?.posts || []), ...incoming.posts],
							};
						},
					},
				},
			},
		},
	}),
});

import { onError } from "@apollo/client/link/error";

const link = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

function MyApp({ Component, pageProps }: any) {
	return (
		<>
			<Head>
				<title>Global Acoustics: Forms</title>
			</Head>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<CSSReset />
					<Component {...pageProps} />
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
