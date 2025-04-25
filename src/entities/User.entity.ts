import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Session } from "../entities/Session.entity";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  createdAt: string;

  @OneToOne(() => Session, (session) => session.user)
  session: Session;
}
