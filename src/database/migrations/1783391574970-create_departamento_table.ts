import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartamentoTable1783391574970 implements MigrationInterface {
    name = 'CreateDepartamentoTable1783391574970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "departamentos" ("id" SERIAL NOT NULL, "nombreDepartamento" character varying NOT NULL, "ubicacion" character varying, CONSTRAINT "UQ_0431fd58a5fdadedd89d9122b2a" UNIQUE ("nombreDepartamento"), CONSTRAINT "PK_6d34dc0415358a018818c683c1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cargos" ("id" SERIAL NOT NULL, "nombreCargo" character varying NOT NULL, "salarioBase" numeric(10,2) NOT NULL, "departamentoId" integer, CONSTRAINT "PK_052f813788106484e4ef7cd1745" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cargos" ADD CONSTRAINT "FK_f0f7c23b855ae6a397d7eecbaf7" FOREIGN KEY ("departamentoId") REFERENCES "departamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cargos" DROP CONSTRAINT "FK_f0f7c23b855ae6a397d7eecbaf7"`);
        await queryRunner.query(`DROP TABLE "cargos"`);
        await queryRunner.query(`DROP TABLE "departamentos"`);
    }

}
