import { MigrationInterface, QueryRunner } from "typeorm";

export class databaseInitialise1607675625504 implements MigrationInterface {
	name = "databaseInitialise1607675625504";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "incident_report" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isReviewed" character varying, "reviewer" character varying, "reviewDate" TIMESTAMP, "incidentDatetime" character varying NOT NULL, "incidentLocation" character varying NOT NULL, "incidentDetails" character varying NOT NULL, "incidentWitnesses" character varying, "take5Completed" character varying NOT NULL, "SWMScompleted" character varying NOT NULL, "fatiguePlanCompleted" character varying NOT NULL, "siteProceduresFollowed" character varying NOT NULL, "injurySustained" character varying NOT NULL, "equipmentDamaged" character varying NOT NULL, "injuryNature" character varying, "injuryAgency" character varying, "stoppedWork" character varying, "treatmentRecieved" character varying, "treatmentDetails" character varying, "equipmentCompany" character varying, "equipmentItem" character varying, "damageDetails" character varying, "causalFactors" character varying, "recurrenceLiklihood" character varying, "outcomeSeverity" character varying, "resultingRisk" character varying, "actionsTaken" character varying, "actionDate" character varying, "actionPerson" character varying, CONSTRAINT "PK_6eea1fab61c604d9a09d5ae4a41" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "incident_report" ADD CONSTRAINT "FK_194d76d2c1848cf6a627880e7b4" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`INSERT INTO "user" (username, email, password) VALUES ('test', 'test@test.com', '$argon2i$v=19$m=4096,t=3,p=1$t13gO6eV0zY9XYlIPYGlEw$518kuTo+KGoKhwMoOXaKHdk0wlwHI1axqeYwCa/Lr8E')`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "incident_report" DROP CONSTRAINT "FK_194d76d2c1848cf6a627880e7b4"`
		);
		await queryRunner.query(`DROP TABLE "incident_report"`);
		await queryRunner.query(`DROP TABLE "user"`);
	}
}
