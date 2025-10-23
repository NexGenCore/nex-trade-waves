import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("simulation_lessons")
export class SimulationLesson {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  difficulty: string // 'beginner', 'intermediate', 'advanced'

  @Column("text")
  content: string

  @Column({ nullable: true })
  videoUrl: string

  @Column({ default: 0 })
  order: number

  @CreateDateColumn()
  createdAt: Date
}
