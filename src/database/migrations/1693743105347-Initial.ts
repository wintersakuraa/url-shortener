import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1693743105347 implements MigrationInterface {
    name = 'Initial1693743105347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "url" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "longUrl" character varying NOT NULL, "shortUrl" character varying NOT NULL, "urlCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_7421088122ee64b55556dfc3a91" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "url"`);
    }

}
