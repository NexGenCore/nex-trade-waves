import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("votes")
export class Vote {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  proposalId: string

  @Column()
  voterId: string

  @Column()
  vote: boolean // true for yes, false for no

  @CreateDateColumn()
  createdAt: Date
}
