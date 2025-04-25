import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";

import { Startup } from "../entities/Startup.entity";
import { Investor } from "../entities/Investor.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "sarvesh@110304",
  database: "growBridge",
  logging: true,
  synchronize: true,
  entities: [User,  Startup,Investor],
});
