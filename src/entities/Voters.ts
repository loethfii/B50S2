import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
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
  @ManyToOne(() => Paslon, (paslon) => paslon.votersRel)
  paslon: Paslon;
}
