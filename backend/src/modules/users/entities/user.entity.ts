import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: "user" })
  role: string // 'user', 'trader', 'educator', 'admin'

  @Column({ nullable: true })
  walletAddress: string

  @Column({ default: 0 })
  simulationBalance: number

  @Column({ default: 0 })
  realBalance: number

  @Column({ default: false })
  emailVerified: boolean

  @Column({ nullable: true })
  profileImage: string

  @Column({ nullable: true })
  bio: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
