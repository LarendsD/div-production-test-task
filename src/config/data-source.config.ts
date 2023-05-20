import { SupportMember } from '../support-members/entities/support-member.entity';
import { Request } from '../requests/entities/request.entity';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

console.log(process.env.DATABASE_URL);
export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [Request, SupportMember],
  migrations: [],
};
