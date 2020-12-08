import { useRouter } from "next/router";
import { useIncidentReportQuery } from "../generated/graphql";

export const useGetReportFromUrl = () => {
	const router = useRouter();
	const intId =
		typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
	return useIncidentReportQuery({
		skip: intId === -1,
		variables: {
			id: intId,
		},
	});
};
