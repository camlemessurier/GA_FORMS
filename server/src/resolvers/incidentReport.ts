import { IncidentReport } from "./../entities/IncidentReport";
import {
	Arg,
	Ctx,
	Field,
	FieldResolver,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { IncidentReportInput } from "./IncidentReportInput";

@ObjectType()
class PaginatedReports {
	@Field(() => [IncidentReport])
	incidentReports: IncidentReport[];
	@Field()
	hasMore: boolean;
}

@Resolver(IncidentReport)
export class IncidentReportResolver {
	@FieldResolver(() => String)
	textSnippet(@Root() incidentReport: IncidentReport) {
		return incidentReport.incidentDetails.slice(0, 50) + "...";
	}

	@FieldResolver(() => User)
	creator(
		@Root() incidentReport: IncidentReport,
		@Ctx() { userLoader }: MyContext
	) {
		return userLoader.load(incidentReport.creatorId);
	}

	@Mutation(() => Boolean)
	async reviewIncidentReport(
		@Arg("username", () => String) username: string,
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await getConnection()
			.createQueryBuilder()
			.update(IncidentReport)
			.set({ reviewer: username, isReviewed: "Yes" })
			.where("id= :id", { id: id })
			.execute();
		return true;
	}

	@Query(() => PaginatedReports)
	async incidentReports(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null
	): Promise<PaginatedReports> {
		const realLimit = Math.min(50, limit);
		const reaLimitPlusOne = realLimit + 1;

		const replacements: any[] = [reaLimitPlusOne];

		if (cursor) {
			replacements.push(new Date(parseInt(cursor)));
		}

		const incidentReports = await getConnection().query(
			`
				select p.*
				from incident_report p
				${cursor ? `where p."createdAt" < $2` : ""}
				order by p."createdAt" DESC
				limit $1
    		`,
			replacements
		);

		return {
			incidentReports: incidentReports.slice(0, realLimit),
			hasMore: incidentReports.length === reaLimitPlusOne,
		};
	}

	@Query(() => IncidentReport, { nullable: true })
	IncidentReport(
		@Arg("id", () => Int) id: number
	): Promise<IncidentReport | undefined> {
		return IncidentReport.findOne(id);
	}

	@Mutation(() => IncidentReport)
	@UseMiddleware(isAuth)
	async createIncidentReport(
		@Arg("input") input: IncidentReportInput,
		@Ctx() { req }: MyContext
	): Promise<IncidentReport> {
		return IncidentReport.create({
			...input,
			creatorId: req.session.userId,
		}).save();
	}

	@Mutation(() => IncidentReport, { nullable: true })
	@UseMiddleware(isAuth)
	async updateIncidentReport(
		@Arg("id", () => Int) id: number,
		@Arg("input") input: IncidentReportInput,
		@Ctx() { req }: MyContext
	): Promise<IncidentReport | null> {
		const result = await getConnection()
			.createQueryBuilder()
			.update(IncidentReport)
			.set(input)
			.where('id = :id and "creatorId" = :creatorId', {
				id,
				creatorId: req.session.userId,
			})
			.returning("*")
			.execute();

		return result.raw[0];
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteIncidentReport(
		@Arg("id", () => Int) id: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		await IncidentReport.delete({ id, creatorId: req.session.userId });
		return true;
	}
}
