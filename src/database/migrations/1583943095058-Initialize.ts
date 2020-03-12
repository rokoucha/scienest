import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialize1583943095058 implements MigrationInterface {
  name = 'Initialize1583943095058'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tag" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "is_admin" boolean NOT NULL DEFAULT 'FALSE', "name" character varying NOT NULL, "screenName" SERIAL NOT NULL, CONSTRAINT "UQ_dd2a30203744cf48f21c95d26fe" UNIQUE ("screenName"), CONSTRAINT "PK_aed41526fa74c970c58a12fa889" PRIMARY KEY ("id", "screenName"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TYPE "article_scope_enum" AS ENUM('private', 'public', 'unlisted')`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "article" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "path" character varying(128) NOT NULL, "title" character varying(32) NOT NULL, "text" text NOT NULL, "scope" "article_scope_enum" NOT NULL DEFAULT 'private', "userId" integer, "userScreenName" integer, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "article_tags_tag" ("articleId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_25290137c7f85b582eea2bc470d" PRIMARY KEY ("articleId", "tagId"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9b7dd28292e2799512cd70bfd8" ON "article_tags_tag" ("articleId") `,
      undefined,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_5fee2a10f8d6688bd2f2c50f15" ON "article_tags_tag" ("tagId") `,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "article" ADD CONSTRAINT "FK_b53d000f94969ca8bc86ccea99b" FOREIGN KEY ("userId", "userScreenName") REFERENCES "user"("id","screenName") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "article_tags_tag" ADD CONSTRAINT "FK_9b7dd28292e2799512cd70bfd81" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "article_tags_tag" ADD CONSTRAINT "FK_5fee2a10f8d6688bd2f2c50f15e" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article_tags_tag" DROP CONSTRAINT "FK_5fee2a10f8d6688bd2f2c50f15e"`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "article_tags_tag" DROP CONSTRAINT "FK_9b7dd28292e2799512cd70bfd81"`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "article" DROP CONSTRAINT "FK_b53d000f94969ca8bc86ccea99b"`,
      undefined,
    )
    await queryRunner.query(
      `DROP INDEX "IDX_5fee2a10f8d6688bd2f2c50f15"`,
      undefined,
    )
    await queryRunner.query(
      `DROP INDEX "IDX_9b7dd28292e2799512cd70bfd8"`,
      undefined,
    )
    await queryRunner.query(`DROP TABLE "article_tags_tag"`, undefined)
    await queryRunner.query(`DROP TABLE "article"`, undefined)
    await queryRunner.query(`DROP TYPE "article_scope_enum"`, undefined)
    await queryRunner.query(`DROP TABLE "user"`, undefined)
    await queryRunner.query(`DROP TABLE "tag"`, undefined)
  }
}
