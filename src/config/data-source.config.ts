import { Request } from '../requests/entities/request.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  username: process.env.DATABASE_USERNAME ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'postgres',
  port: Number(process.env.DATABASE_PORT),
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [Request],
  migrations: [],
};
