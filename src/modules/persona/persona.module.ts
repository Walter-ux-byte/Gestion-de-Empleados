import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { personaProviders } from './persona.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonaController],
  providers: [PersonaService, ...personaProviders],
  exports: [PersonaService]
})
export class PersonaModule {}
