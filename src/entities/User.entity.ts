import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Investor } from "./Investor.entity";
import { Startup } from "./Startup.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  role: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToOne(() => Startup, (startup) => startup.user)
  startup?: Startup;

  @OneToOne(() => Investor, (investor) => investor.user)
  investor?: Investor;
}
