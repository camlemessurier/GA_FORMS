import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1607584401227 implements MigrationInterface {
	name = "Initial1607584401227";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "points" integer NOT NULL DEFAULT '0', "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "incident_report" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isReviewed" character varying, "reviewer" character varying, "reviewDate" TIMESTAMP, "incidentDatetime" character varying NOT NULL, "incidentLocation" character varying NOT NULL, "incidentDetails" character varying NOT NULL, "incidentWitnesses" character varying, "take5Completed" character varying NOT NULL, "SWMScompleted" character varying NOT NULL, "fatiguePlanCompleted" character varying NOT NULL, "siteProceduresFollowed" character varying NOT NULL, "injurySustained" character varying NOT NULL, "equipmentDamaged" character varying NOT NULL, "injuryNature" character varying, "injuryLocation" character varying, "injuryAgency" character varying, "stoppedWork" character varying, "treatmentRecieved" character varying, "treatmentDetails" character varying, "equipmentCompany" character varying, "equipmentItem" character varying, "damageDetails" character varying, "causalFactors" character varying, "recurrenceLiklihood" character varying, "outcomeSeverity" character varying, "resultingRisk" character varying, "actionsTaken" character varying, "actionDate" character varying, "actionPerson" character varying, CONSTRAINT "PK_6eea1fab61c604d9a09d5ae4a41" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "updoot" ("value" integer NOT NULL, "userId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_6476d7e464bcb8571004134515c" PRIMARY KEY ("userId", "postId"))`
		);
		await queryRunner.query(
			`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "incident_report" ADD CONSTRAINT "FK_194d76d2c1848cf6a627880e7b4" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "updoot" ADD CONSTRAINT "FK_9df9e319a273ad45ce509cf2f68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "updoot" ADD CONSTRAINT "FK_fd6b77bfdf9eae6691170bc9cb5" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`INSERT INTO user(username, email, password) VALUES ('admin', 'admin@admin.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918')`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "updoot" DROP CONSTRAINT "FK_fd6b77bfdf9eae6691170bc9cb5"`
		);
		await queryRunner.query(
			`ALTER TABLE "updoot" DROP CONSTRAINT "FK_9df9e319a273ad45ce509cf2f68"`
		);
		await queryRunner.query(
			`ALTER TABLE "incident_report" DROP CONSTRAINT "FK_194d76d2c1848cf6a627880e7b4"`
		);
		await queryRunner.query(
			`ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`
		);
		await queryRunner.query(`DROP TABLE "updoot"`);
		await queryRunner.query(`DROP TABLE "incident_report"`);
		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP TABLE "post"`);
	}
}
