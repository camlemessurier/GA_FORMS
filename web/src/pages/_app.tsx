import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import theme from "../theme";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import { PaginatedPosts, PostsQuery } from "../generated/graphql";

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

function MyApp({ Component, pageProps }: any) {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<CSSReset />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default MyApp;
