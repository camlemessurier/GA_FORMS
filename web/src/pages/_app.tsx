import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { CSSReset, ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { PaginatedPosts } from "../generated/graphql";
import Head from "next/head";
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

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	credentials: "include",
	//link: ApolloLink.from([link,new HttpLink({ uri: "http://localhost:4000/graphql" }),]), /// uncomment for graphql error checking. When on messes with workaround auth
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

function MyApp({ Component, pageProps }: any) {
	return (
		<>
			<Head>
				<title>GA Forms</title>
			</Head>
			<ApolloProvider client={client}>
				<ChakraProvider theme={theme}>
					<CSSReset />
					<Component {...pageProps} />
				</ChakraProvider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
