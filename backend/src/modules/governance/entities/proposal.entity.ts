import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("proposals")
export class Proposal {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  @Column("text")
  description: string

  @Column()
  proposerId: string

  @Column({ default: "active" })
  status: string // 'active', 'passed', 'rejected'

  @Column({ default: 0 })
  votesFor: number

  @Column({ default: 0 })
  votesAgainst: number

  @Column()
  votingDeadline: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
