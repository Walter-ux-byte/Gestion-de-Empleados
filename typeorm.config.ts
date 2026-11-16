import { config } from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development';

config({
  override: true,
  path: resolve(process.cwd(), `.env.${env}`),
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
