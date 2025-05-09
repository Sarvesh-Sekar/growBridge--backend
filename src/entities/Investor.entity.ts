import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "investor" })
export class Investor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  investorName: string;

  @Column()
  profileImage: string;

  @Column()
  investorType: string;

  @Column("text", { array: true })
  interests: string[];

  @Column()
  userId: string;

  @Column()
  location: string;

  @Column()
  email: string;

  @Column()
  contactNo: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  user: User;
}
