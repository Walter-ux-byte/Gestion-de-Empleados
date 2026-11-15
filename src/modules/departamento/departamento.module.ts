import { Module } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { DepartamentoController } from './departamento.controller';
import { departamentoProviders } from './departamento.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DepartamentoController],
  providers: [DepartamentoService, ...departamentoProviders],
})
export class DepartamentoModule {}
