import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateData1700035330650 implements MigrationInterface {
    name = 'MigrateData1700035330650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pemilu_news" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "author" character varying(255) NOT NULL, "image" character varying(300) NOT NULL, "description" text NOT NULL, "posted_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c63e2caec4e125977cae8283ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partai" ("id" SERIAL NOT NULL, "nama" character varying(255) NOT NULL, "ketua_umum" character varying(255) NOT NULL, "visi_misi" text NOT NULL, "alamat" text NOT NULL, "image" character varying(300) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c5c70fa29884e15f3b88a1b40b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "nama" character varying(255) NOT NULL, "nomor_urut" character varying(255) NOT NULL, "visi_misi" text NOT NULL, "image" character varying(300) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "paslon"`);
        await queryRunner.query(`DROP TABLE "partai"`);
        await queryRunner.query(`DROP TABLE "pemilu_news"`);
    }

}
