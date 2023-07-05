import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTables1688523941759 implements MigrationInterface {
    name = 'UserTables1688523941759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "apiId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "apiId"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "user_id"`);
    }

}
