
import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1794838915879 implements MigrationInterface {
    name = 'UpdateTables1794838915879';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "mail" TO "email"`);

        await queryRunner.query(`CREATE TABLE "departamentos" ("id" SERIAL NOT NULL, "nombreDepartamento" character varying NOT NULL, "ubicacion" character varying, CONSTRAINT "UQ_0431fd58a5fdadedd89d9122b2a" UNIQUE ("nombreDepartamento"), CONSTRAINT "PK_6d34dc0415358a018818c683c1e" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "cargos" ("id" SERIAL NOT NULL, "nombreCargo" character varying NOT NULL, "salarioBase" numeric(10,2) NOT NULL, "departamentoId" integer, CONSTRAINT "PK_052f813788106484e4ef7cd1745" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "persona" ("id" SERIAL NOT NULL, "nombres" character varying NOT NULL, "apellidos" character varying NOT NULL, "mail" character varying, "userId" integer, CONSTRAINT "REL_551ede1f9ac73b4e8f18495c6d" UNIQUE ("userId"), CONSTRAINT "PK_13aefc75f60510f2be4cd243d71" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying(250) NOT NULL, "precio" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "image" character varying(250), "descripcion" text, "estado" boolean NOT NULL DEFAULT true, "categoriaId" integer, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "detalle" character varying, CONSTRAINT "UQ_a5be7aa67e759e347b1c6464e10" UNIQUE ("nombre"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "role_user" ("rolesId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c9667a1fe5b74f7427a3ab50025" PRIMARY KEY ("rolesId", "userId"))`);

        await queryRunner.query(`CREATE INDEX "IDX_eb446d431a1abb9801e6ade445" ON "role_user" ("rolesId")`);

        await queryRunner.query(`CREATE INDEX "IDX_2a23ceb75c7511d0523c4aaf49" ON "role_user" ("userId")`);

        // Modificar tipos sin eliminar los datos existentes
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" TYPE character varying(50) USING "name"::character varying`);

        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" TYPE character varying(255) USING "email"::character varying`);

        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" TYPE character varying(200) USING "password"::character varying`);

        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);

        await queryRunner.query(`ALTER TABLE "categoria" ALTER COLUMN "nombre" TYPE character varying(50) USING "nombre"::character varying`);

        await queryRunner.query(`ALTER TABLE "cargos" ADD CONSTRAINT "FK_f0f7c23b855ae6a397d7eecbaf7" FOREIGN KEY ("departamentoId") REFERENCES "departamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "persona" ADD CONSTRAINT "FK_551ede1f9ac73b4e8f18495c6da" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_eb446d431a1abb9801e6ade4456" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_eb446d431a1abb9801e6ade4456"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7"`);
        await queryRunner.query(`ALTER TABLE "persona" DROP CONSTRAINT "FK_551ede1f9ac73b4e8f18495c6da"`);
        await queryRunner.query(`ALTER TABLE "cargos" DROP CONSTRAINT "FK_f0f7c23b855ae6a397d7eecbaf7"`);

        await queryRunner.query(`ALTER TABLE "categoria" ALTER COLUMN "nombre" TYPE character varying(100) USING "nombre"::character varying`);

        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);

        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" TYPE character varying USING "password"::character varying`);

        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" TYPE character varying USING "email"::character varying`);

        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" TYPE character varying USING "name"::character varying`);

        await queryRunner.query(`DROP INDEX "public"."IDX_2a23ceb75c7511d0523c4aaf49"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb446d431a1abb9801e6ade445"`);

        await queryRunner.query(`DROP TABLE "role_user"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "persona"`);
        await queryRunner.query(`DROP TABLE "cargos"`);
        await queryRunner.query(`DROP TABLE "departamentos"`);

        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "mail"`);
    }
}
