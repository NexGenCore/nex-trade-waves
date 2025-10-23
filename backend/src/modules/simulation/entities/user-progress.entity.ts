import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("user_progress")
export class UserProgress {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @Column()
  lessonId: string

  @Column({ default: false })
  completed: boolean

  @Column({ default: 0 })
  score: number

  @Column({ nullable: true })
  completedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
