import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PaslonPartai } from "./paslon_partai";

@Entity()
export class Paslon {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  nama: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  nomor_urut: string;

  @Column({ type: "text", nullable: false })
  visi_misi: string;

  @Column({ type: "varchar", length: 300, nullable: false })
  image: string;

  @OneToMany(() => PaslonPartai, (paslon_partai) => paslon_partai.paslon)
  paslonsRel: PaslonPartai[];

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
