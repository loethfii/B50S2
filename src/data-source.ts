import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import * as dotenv from "dotenv";
import { MainSeeder } from "./seeds/MainSeeder";
dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE_NAME as string,
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
