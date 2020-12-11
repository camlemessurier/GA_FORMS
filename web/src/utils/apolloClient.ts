import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { PaginatedReports } from "../generated/graphql";
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

const apolloClient = new ApolloClient({
	link: ApolloLink.from([
		link,
		new HttpLink({
			uri: "http://localhost:4000/graphql",
			credentials: "include",
		}),
	]),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					incidentReports: {
						keyArgs: [],
						merge(
							existing: PaginatedReports | undefined,
							incoming: PaginatedReports
						) {
							return {
								...incoming,
								reports: [
									...(existing?.incidentReports || []),
									...incoming.incidentReports,
								],
							};
						},
					},
				},
			},
		},
	}),
});

export default apolloClient;
