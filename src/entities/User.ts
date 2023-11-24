import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ length: 100 })
  full_name: string;

  @Column({ type: "text" })
  alamat: string;

  @Column({ length: 50 })
  jenis_kelamin: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100, default: "user" })
  role: string;

  @Column({ length: 300 })
  password: string;
}
