import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'node:path';

if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config();
  if (result.error) {
    Logger.error('There was an error loading dotenv');
  }
}

const ormConfig = {
  type: 'postgres' as const,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'postgres',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  seeds: [join(__dirname, '/seeds/*{.ts,.js}')],
  migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
  autoLoadEntities: true,
  cli: {
    migrationsDir: '/migrations',
  },
  logging: process.env.TYPE_ORM_LOGGING_ENABLED != null,
  synchronize: false,
};

export default ormConfig;
