import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("analytics")
export class Analytics {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @Column()
  eventType: string // 'trade', 'lesson_completed', 'portfolio_update'

  @Column("jsonb", { nullable: true })
  metadata: Record<string, any>

  @Column("decimal", { precision: 18, scale: 8, nullable: true })
  value: number

  @CreateDateColumn()
  createdAt: Date
}
