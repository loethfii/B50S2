import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PemiluNews {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  author: string;

  @Column({ type: "varchar", length: 300, nullable: false })
  image: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  posted_at: Date;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
