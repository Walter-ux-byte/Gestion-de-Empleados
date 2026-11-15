import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMailToPersona1794776400000 implements MigrationInterface {
  name = 'AddMailToPersona1794776400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "persona" ADD "mail" character varying');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "persona" DROP COLUMN "mail"');
  }
}
