import * as dotenv from 'dotenv';
import {DataSource} from "typeorm";
import {User} from "./users/entities/user.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  entities: [User],
  migrations: [ './dist/**/migration/*.js' ],
  migrationsRun: true,
});
