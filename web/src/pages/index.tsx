import { withUrqlClient } from "next-urql";
import React from "react";
import { Navbar } from "../components/Navbar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
	const [{ data }] = usePostsQuery();

	return (
		<>
			<Navbar />
			{!data ? (
				<div>Loading...</div>
			) : (
				data.posts.map((p) => <div key={p.id}>{p.title}</div>)
			)}
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);