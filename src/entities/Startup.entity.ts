import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "startup" })
export class Startup {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  startupName: string;

  @Column()
  marketCap: number;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  burnRate: number;

  @Column()
  returnRate: number;

  @Column()
  runAway: number;

  @Column()
  email: string;

  @Column()
  contactNo: string;

  @Column()
  location: string;

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
