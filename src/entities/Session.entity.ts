import { PrimaryColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "session" })
export class Session {
  @PrimaryColumn("uuid")
  sessionId: string;

  @Column()
  deviceName: string;

  @Column()
  timeStamp: Date;

  @OneToOne(() => User, (user) => user.session)
  @JoinColumn({ name: "id" })
  user: User;
}
