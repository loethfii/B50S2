import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Paslon } from "./Paslon";

@Entity()
export class Voters {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column()
  userId: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  paslonId: number;
  @OneToOne(() => Paslon)
  @JoinColumn()
  paslon: Paslon;
}
