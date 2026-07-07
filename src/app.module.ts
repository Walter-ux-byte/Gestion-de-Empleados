import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module'; 
// 1. IMPORTA TU MÓDULO DE USUARIOS AQUÍ ARRIBA:
import { UsersModule } from './modules/users/users.module'; 
import { ConfigModule } from './config/config.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { PersonaModule } from './modules/persona/persona.module';
import { ProductoModule } from './modules/producto/producto.module';
import { RoleModule } from './modules/role/role.module';
import { DepartamentoModule } from './modules/departamento/departamento.module';
import { CargoModule } from './modules/cargo/cargo.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    ConfigModule,
    CategoriaModule,
    PersonaModule,
    ProductoModule,
    RoleModule,
    DepartamentoModule,
    CargoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}