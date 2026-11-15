import { DataSource } from 'typeorm';
import { Departamento } from './entities/departamento.entity';

export const departamentoProviders = [
  {
    provide: 'DEPARTAMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Departamento),
    inject: ['DATABASE_CONNECTION_POSTGRES']
  }
];
