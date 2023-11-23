import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Paslon } from "./Paslon";
import { Partai } from "./Partai";

@Entity()
export class PaslonPartai {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  paslonId: number;
  @ManyToOne(() => Paslon, (paslon) => paslon.paslonsRel)
  paslon: Paslon;

  @Column()
  partaiId: number;
  @ManyToOne(() => Partai, (partai) => partai.partaiRel)
  partai: Partai;
}
